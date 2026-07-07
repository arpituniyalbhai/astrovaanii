import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { createRazorpayOrder } from "../../lib/razorpay/create-order";

export const Route = createFileRoute("/api/create-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as {
            planName: string;
            amount: number;
            email: string;
          };

          const { planName, amount, email } = body;

          if (!planName || !amount || !email) {
            return new Response(
              JSON.stringify({ error: "Missing required fields" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // Convert amount to paise (₹79 = 7900 paise)
          const amountInPaise = Math.round(amount * 100);

          const receipt = `${planName}_${email}_${Date.now()}`;

          const order = await createRazorpayOrder({
            amount: amountInPaise,
            currency: "INR",
            receipt,
            notes: {
              planName,
              email,
            },
          });

          return new Response(
            JSON.stringify({
              orderId: order.id,
              amount: order.amount,
              currency: order.currency,
              keyId: process.env.RAZORPAY_LIVE_API,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.error("Order creation error:", error);
          return new Response(
            JSON.stringify({ error: "Failed to create order" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
