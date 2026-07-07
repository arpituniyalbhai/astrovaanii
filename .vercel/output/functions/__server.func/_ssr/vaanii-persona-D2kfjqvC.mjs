import { o as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { i as setDoc, n as onSnapshot, o as doc, s as getFirestore, t as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { i as signInWithPopup, n as createUserWithEmailAndPassword, r as getAuth, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vaanii-persona-D2kfjqvC.js
var app = initializeApp({
	apiKey: "AIzaSyCPEGp0ub5sUeRSHlcZuctNU9ieJmDwceo",
	authDomain: "astrovaanii-ai.firebaseapp.com",
	projectId: "astrovaanii-ai",
	storageBucket: "astrovaanii-ai.firebasestorage.app",
	messagingSenderId: "244796939843",
	appId: "1:244796939843:web:b7c143d15dea8fe7a47ef6",
	measurementId: "G-WM1T1W6YFJ"
});
var auth = getAuth(app);
var googleProvider = new GoogleAuthProvider();
var db = getFirestore(app);
async function signInWithGoogle() {
	return (await signInWithPopup(auth, googleProvider)).user;
}
async function signUpWithEmail(email, password) {
	return (await createUserWithEmailAndPassword(auth, email, password)).user;
}
function emailToDocId(email) {
	return email.replace(/\./g, ",");
}
async function getUserDoc(email) {
	const snap = await getDoc(doc(db, "Users", emailToDocId(email)));
	return snap.exists() ? snap.data() : null;
}
function onUserDoc(email, callback) {
	return onSnapshot(doc(db, "Users", emailToDocId(email)), (snap) => {
		callback(snap.exists() ? snap.data() : null);
	});
}
async function createUserDoc(email, data) {
	await setDoc(doc(db, "Users", emailToDocId(email)), data, { merge: true });
}
var vaanii_persona_default = "/assets/vaanii-persona-BJOqqX-O.jpg";
//#endregion
export { signInWithGoogle as a, onUserDoc as i, createUserDoc as n, signUpWithEmail as o, getUserDoc as r, vaanii_persona_default as s, auth as t };
