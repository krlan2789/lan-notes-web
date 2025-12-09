import { adminDb } from "../../libs/firebase-admin";
import DeleteCommentDto from "~~/server/dtos/DeleteCommentDto";

export default defineEventHandler(async (event) => {
  // const uid = event.context.auth?.uid;

  const slug = getRouterParam(event, "slug");
  const body = await readBody<DeleteCommentDto>(event);

  if (!slug || !body.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request",
    });
  }

  await adminDb.collection("notes").doc(slug).collection("comments").doc(body.id).delete();

  return { success: true };
});
