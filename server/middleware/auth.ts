import { auth } from "../libs/firebase-admin";

export default defineEventHandler(async (event) => {
	if (!event.node.req.url?.startsWith("/api")) return;

	const authHeader = event.headers.get('authorization');
	// console.log('Token: ' + authHeader);
	if (authHeader == null || authHeader.length == 0) {
		throw createError({ statusCode: 401, statusMessage: "Missing Authorization header" });
	} else {
		const token = authHeader.split(" ")[1];
		try {
			const decoded = await auth.verifyIdToken(token);
			event.context.auth = { uid: decoded.uid };
			// console.log('auth: ' + event.context.auth);
		} catch (err) {
			console.error("Auth error:", err);
			throw createError({ statusCode: 401, statusMessage: "Invalid or expired token" });
		}
	}
});
