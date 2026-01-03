import type IUserAuth from "~/utils/models/IUserAuth";
import * as jose from "jose";

export const FirebaseServiceToken = "IFirebaseService";

export interface IFirebaseService {
	/**
	 * Anonymous sign-in (REST equivalent of signInAnonymously)
	 * @returns
	 */
	signInAnonymously(): Promise<IUserAuth>;
	/**
	 * Register using Email and Password (REST API)
	 * @returns
	 */
	registerWithEmailPassword(email: string, password: string): Promise<IUserAuth>;
	/**
	 * Login with registered Email and Password (REST API)
	 * @returns
	 */
	loginWithEmailPassword(email: string, password: string): Promise<IUserAuth>;
	/**
	 * Verify ID token (JWT verification, Cloudflare-safe)
	 * @param userToken
	 * @returns
	 */
	verifyUserToken(userToken: string): Promise<jose.JWTPayload>;
	/**
	 * Updating User displayname/nickname
	 * @param userToken
	 * @param displayName
	 * @returns
	 */
	updateDisplayName(userToken: string, displayName: string): Promise<IUserAuth>;
	/**
	 * Fetch Firestore document via REST API
	 * @param documentPath
	 * @returns
	 */
	fetchDocument(documentPath: string): Promise<any>;
	/**
	 * Store Firestore document via REST API
	 * @param documentPath
	 * @param fields
	 * @returns
	 */
	storeDocument(documentPath: string, fields: any): Promise<any>;
}
