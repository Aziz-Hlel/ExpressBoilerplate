import admin from "firebase-admin";
import ENV from "../config/ENV";

async function testFirebaseConnection() {
  try {
    // Attempt to list collections (lightweight read)
    await admin.firestore().listCollections();
    console.log("✅ SUCCESS: Firebase credentials are valid and connected!");
  } catch (error) {
    console.error("❌ ERROR: Firebase credentials rejected or network issue.");
    console.error(error);
  }
}

let serviceAccount: string;

try {
  // Handle potential newline escaping issues in .env files
  serviceAccount = JSON.parse(ENV.FIREBASE_CERT);
} catch (error) {
  console.error("❌ FATAL: Could not parse FIREBASE_CERT JSON.");
  //   console.error("Make sure your .env variable does not have extra quotes or malformed newlines.");
  process.exit(1); // Stop the app
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

testFirebaseConnection();

export const firebaseAdmin = admin;
