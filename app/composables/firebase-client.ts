import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

export const useFirebaseClient = () => {
    const config: FirebaseOptions = {
        apiKey: "" + useRuntimeConfig().public.NUXT_PUBLIC_FIREBASE_API_KEY,
        appId: "" + useRuntimeConfig().public.NUXT_PUBLIC_FIREBASE_APP_ID,
        authDomain: "" + useRuntimeConfig().public.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        messagingSenderId: "" + useRuntimeConfig().public.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        projectId: "" + useRuntimeConfig().public.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: "" + useRuntimeConfig().public.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    };

    const app = getApps().length > 0 ? getApps().at(0)! : initializeApp(config);
    const auth = getAuth(app);
    return {
        firebaseAuth: auth,
    };
};