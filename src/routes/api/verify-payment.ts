import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore";
import { verifyRazorpayPayment } from "../../lib/razorpay/verify-order";

const firebaseConfig = {
  apiKey: "AIzaSyCPEGp0ub5sUeRSHlcZuctNU9ieJmDwceo",
  authDomain: "astrovaanii-ai.firebaseapp.com",
  projectId: "astrovaanii-ai",
  storageBucket: "astrovaanii-ai.firebasestorage.app",
  messagingSenderId: "244796939843",
  appId: "1:244796939843:web:b7c143d15dea8fe7a47ef6",
  measurementId: "G-WM1T1W6YFJ",
};

const firebaseApp = initializeApp(firebaseConfig, "server");
const db = getFirestore(firebaseApp);

function emailToDocId(email: string) {
  return email.replace(/\./g, ",");
}

const PLAN_CREDITS: Record<string, number> = {
  Starter: 5,
  Pro: 10,
  Premium: 20,
};

const VAANII_MESSAGES = {
  success: [
    "Your stars are aligning beautifully! I've added your credits and I'm ready to guide you on your cosmic journey.",
    "The universe has received your intention. Your credits are now active—let's explore what the stars have in store for you.",
    "Welcome to deeper insights, my friend. Your credits are added and I'm here to illuminate your path.",
  ],
  failed: [
    "The cosmic timing wasn't quite right this time. Don't worry—the stars will align when they're meant to. Try again whenever you feel ready.",
    "Sometimes the universe asks us to pause. Your payment didn't go through, but that's okay. I'm still here whenever you need guidance.",
    "The stars suggest a brief delay. Your payment couldn't be processed, but your journey continues. Feel free to try again.",
  ],
};

function getRandomMessage(type: "success" | "failed"): string {
  const messages = VAANII_MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)];
}

export const Route = createFileRoute("/api/verify-payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as {
            orderId: string;
            paymentId: string;
            signature: string;
            planName: string;
            email: string;
          };

          const { orderId, paymentId, signature, planName, email } = body;

          if (!orderId || !paymentId || !signature || !planName || !email) {
            return new Response(
              JSON.stringify({ error: "Missing required fields" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // Verify payment signature
          const verification = verifyRazorpayPayment({
            orderId,
            paymentId,
            signature,
          });

          if (!verification.valid) {
            return new Response(
              JSON.stringify({
                success: false,
                error: "Invalid payment signature",
                vaaniiMessage: getRandomMessage("failed"),
              }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // Get credits for the plan
          const creditsToAdd = PLAN_CREDITS[planName];
          if (!creditsToAdd) {
            return new Response(
              JSON.stringify({ error: "Invalid plan name" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // Update user credits in Firestore
          const userRef = doc(db, "Users", emailToDocId(email));
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            return new Response(
              JSON.stringify({ error: "User not found" }),
              { status: 404, headers: { "Content-Type": "application/json" } }
            );
          }

          const currentCredits = userSnap.data().questionsRemaining || 0;
          await updateDoc(userRef, {
            questionsRemaining: increment(creditsToAdd),
          });

          // Log the purchase
          const purchaseRef = doc(db, "Users", emailToDocId(email), "purchases", Date.now().toString());
          await setDoc(purchaseRef, {
            planName,
            amount: PLAN_CREDITS[planName],
            paymentId,
            orderId,
            purchasedAt: new Date().toISOString(),
            creditsBefore: currentCredits,
            creditsAfter: currentCredits + creditsToAdd,
          });

          return new Response(
            JSON.stringify({
              success: true,
              creditsAdded: creditsToAdd,
              totalCredits: currentCredits + creditsToAdd,
              vaaniiMessage: getRandomMessage("success"),
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.error("Payment verification error:", error);
          return new Response(
            JSON.stringify({
              success: false,
              error: "Payment verification failed",
              vaaniiMessage: getRandomMessage("failed"),
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
