// import { verifyUserToken } from "~~/server/libs/firebase-rest";

export default defineEventHandler(async (event) => {
	if (event.node.req.url?.startsWith("/api")) return;

	/*
	if (event.node.req.url?.startsWith("/api/auth/")) return;
	if (!event.node.req.url?.startsWith("/api")) return;

	const authHeader = event.headers.get("authorization");
	if (!authHeader) {
		throw createError({ statusCode: 401, statusMessage: "Missing Authorization header" });
	}

	const userToken = authHeader.split(" ")[1];
	try {
		const decoded = await verifyUserToken(userToken);
		event.context.auth = { userId: decoded.user_id, userToken };
	} catch (err) {
		console.error("Auth error:", err);
		throw createError({ statusCode: 401, statusMessage: "Invalid or expired token" });
	}
	*/
});
