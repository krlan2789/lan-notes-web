import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../service-account.json";

const adminApp = getApps().length > 0
    ? getApps().at(0)!
    : initializeApp({ credential: cert(serviceAccount as any) });

const adminDb = getFirestore(adminApp);
const auth = getAuth(adminApp);

export { adminApp, adminDb, auth };
