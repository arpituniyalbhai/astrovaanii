import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPEGp0ub5sUeRSHlcZuctNU9ieJmDwceo",
  authDomain: "astrovaanii-ai.firebaseapp.com",
  projectId: "astrovaanii-ai",
  storageBucket: "astrovaanii-ai.firebasestorage.app",
  messagingSenderId: "244796939843",
  appId: "1:244796939843:web:b7c143d15dea8fe7a47ef6",
  measurementId: "G-WM1T1W6YFJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signUpWithEmail(email: string, password: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

function emailToDocId(email: string) {
  return email.replace(/\./g, ",");
}

export async function getUserDoc(email: string) {
  const ref = doc(db, "Users", emailToDocId(email));
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export function onUserDoc(
  email: string,
  callback: (data: Record<string, unknown> | null) => void,
): Unsubscribe {
  const ref = doc(db, "Users", emailToDocId(email));
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? snap.data() : null);
  });
}

export async function createUserDoc(email: string, data: Record<string, unknown>) {
  const ref = doc(db, "Users", emailToDocId(email));
  await setDoc(ref, data, { merge: true });
}

export async function saveQuestion(email: string, question: string) {
  const ref = collection(db, "Users", emailToDocId(email), "questions");
  await addDoc(ref, {
    question,
    askedAt: serverTimestamp(),
  });
}

export async function decrementQuestionsRemaining(email: string) {
  const ref = doc(db, "Users", emailToDocId(email));
  await updateDoc(ref, {
    questionsRemaining: increment(-1),
  });
}
