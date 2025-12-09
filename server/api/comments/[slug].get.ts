import { adminDb } from "../../libs/firebase-admin";
import IComment from "../../../app/utils/models/IComment";

export default defineEventHandler(async (event) => {
	// const uid = event.context.auth?.uid;

	const slug = getRouterParam(event, "slug");
	if (!slug) {
		throw createError({
			statusCode: 400,
			statusMessage: "Slug parameter is required",
		});
	}

	const res = await adminDb.collection("notes").doc(slug).collection("comments").get();
	const docs = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as IComment);
	docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	// console.log(docs);
	return docs;
});
