import { H3Event, EventHandlerRequest } from "h3";
import { IFirebaseService } from "~~/server/libs/contracts/IFirebaseService";
import type IUserAuth from "~/utils/models/IUserAuth";
import * as jose from "jose";

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID!;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY!;

export class FirebaseService implements IFirebaseService {
    private authUrl = "https://identitytoolkit.googleapis.com/v1/";
    private firestoreUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

    constructor(event: H3Event<EventHandlerRequest>) {
    }

    /**
     * Anonymous sign-in (REST equivalent of signInAnonymously)
     * @returns
     */
    async signInAnonymously(): Promise<IUserAuth> {
        const res = await fetch(`${this.authUrl}accounts:signUp?key=${FIREBASE_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        if (!res.ok) {
            throw new Error(`Firebase REST error: ${res.status} ${await res.text()}`);
        }

        const data = await res.json();
        return {
            userId: data.localId,
            userToken: data.idToken,
            refreshToken: data.refreshToken,
            nickname: data.displayName,
        };
    }

    /**
     * Register using Email and Password (REST API)
     * @returns
     */
    async registerWithEmailPassword(email: string, password: string): Promise<IUserAuth> {
        const res = await fetch(`POST ${this.authUrl}accounts:signUp?key=${FIREBASE_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });

        if (!res.ok) {
            throw new Error(`Firebase REST error: ${res.status} ${await res.text()}`);
        }

        const data = await res.json();
        return {
            userId: data.localId,
            userToken: data.idToken,
            refreshToken: data.refreshToken,
            email: email,
        };
    }

    /**
     * Login with registered Email and Password (REST API)
     * @returns
     */
    async loginWithEmailPassword(email: string, password: string): Promise<IUserAuth> {
        const res = await fetch(`${this.authUrl}accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });

        if (!res.ok) {
            throw new Error(`Firebase REST error: ${res.status} ${await res.text()}`);
        }

        const data = await res.json();
        return {
            userId: data.localId,
            userToken: data.idToken,
            refreshToken: data.refreshToken,
            email: data.email,
        };
    }

    /**
     * Verify ID token (JWT verification, Cloudflare-safe)
     * @param userToken
     * @returns
     */
    async verifyUserToken(userToken: string): Promise<jose.JWTPayload> {
        const JWKS = jose.createRemoteJWKSet(
            new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
        );
        const { payload } = await jose.jwtVerify(userToken, JWKS, {
            issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
            audience: FIREBASE_PROJECT_ID,
        });
        // console.log('verifyToken.payload:', payload);
        // { provider_id, iss, aud, auth_time, user_id, sub, iat, exp, firebase: { identities, sign_in_provider } }
        return payload;
    }

    /**
     * Updating User displayname/nickname
     * @param userToken
     * @param displayName
     * @returns
     */
    async updateDisplayName(userToken: string, displayName: string): Promise<IUserAuth> {
        const res = await fetch(`${this.authUrl}accounts:update?key=${FIREBASE_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idToken: userToken,
                displayName,
                // returnSecureToken: true,
            }),
        });

        if (!res.ok) {
            throw new Error(`Firebase REST error: ${res.status} ${await res.text()}`);
        }

        const data = await res.json();
        return {
            userId: data.localId,
            nickname: data.displayName,
            userToken: data.idToken,
            refreshToken: data.refreshToken,
        };
    }

    /**
     * Fetch Firestore document via REST API
     * @param documentPath
     * @returns
     */
    async fetchDocument(documentPath: string): Promise<any> {
        const res = await fetch(`${this.firestoreUrl}/${documentPath}`);
        if (!res.ok) {
            throw new Error(`Firestore REST error: ${res.status} ${await res.text()}`);
        }
        const data = await res.json();
        return data;
    }

    /**
     * Store Firestore document via REST API
     * @param documentPath
     * @param fields
     * @returns
     */
    async storeDocument(documentPath: string, fields: { [key: string]: { stringValue: string } }): Promise<any> {
        const res = await fetch(`${this.firestoreUrl}/${documentPath}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fields }),
        });
        if (!res.ok) {
            throw new Error(`Firestore REST error: ${res.status} ${await res.text()}`);
        }
    }
}
