import type NoteCommentModel from "~~/server/models/NoteCommentModel";
import type IUserAuth from "~~/app/utils/models/IUserAuth";
import * as jose from "jose";

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID!;
const FIREBASE_API_KEY = process.env.NUXT_PUBLIC_FIREBASE_API_KEY!;

/**
 * Anonymous sign-in (REST equivalent of signInAnonymously)
 * @returns
 */
export async function signInAnonymously(): Promise<IUserAuth> {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
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
export async function registerWithEmailPassword(email: string, password: string): Promise<IUserAuth> {
    const res = await fetch(`POST https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
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
export async function loginWithEmailPassword(email: string, password: string): Promise<IUserAuth> {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
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
export async function verifyUserToken(userToken: string) {
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
export async function updateDisplayName(userToken: string, displayName: string): Promise<IUserAuth> {
    const FIREBASE_API_KEY = process.env.NUXT_PUBLIC_FIREBASE_API_KEY!;

    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`, {
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
 * Get comments for a note (Firestore REST API)
 * @param userToken
 * @param slug
 * @returns
 */
export async function getComments(host: string, userToken: string, slug: string): Promise<NoteCommentModel[]> {
    const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/host/${host}/notes/${slug}/comments`,
        // {
        //     headers: {
        //         Authorization: `Bearer ${userToken}`,
        //     },
        // },
    );

    if (!res.ok) {
        throw new Error(`Firestore REST error: ${res.status} ${await res.text()}`);
    }

    const data = await res.json();
    // console.log('fetchComments.data:', data);
    let docs: NoteCommentModel[] = [];
    if (data?.documents) {
        docs = data.documents.map(
            (doc: any) =>
                ({
                    id: doc.name.split("/").pop(),
                    noteSlug: doc.fields.noteSlug?.stringValue,
                    userId: doc.fields.uid?.stringValue,
                    content: doc.fields.content?.stringValue,
                    nickname: doc.fields.nickname?.stringValue,
                    createdAt: doc.fields.createdAt?.stringValue,
                }) as NoteCommentModel,
        ) as NoteCommentModel[];
        docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        // console.log(docs);
    }
    return docs;
}

/**
 * Create new comment in a note (Firestore REST API)
 * @param userToken
 * @param data
 * @returns
 */
export async function createComment(host: string, userToken: string, data: NoteCommentModel) {
    const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/host/${host}/notes/${data.noteSlug}/comments`,
        {
            method: "POST",
            headers: {
                // Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fields: {
                    content: { stringValue: data.content },
                    createdAt: { stringValue: data.createdAt },
                    // userId: { stringValue: data.userId },
                    nickname: { stringValue: data.nickname },
                    noteSlug: { stringValue: data.noteSlug },
                },
            }),
        },
    );

    if (!res.ok) {
        throw new Error(`Firestore REST error: ${res.status} ${await res.text()}`);
    }

    // const json = await res.json();
    // console.log('createComment.json:', json);
}
