import CreateCommentDto from "~~/server/dtos/CreateCommentDto";
import { adminDb } from "../../libs/firebase-admin";

export default defineEventHandler(async (event) => {
    const uid = event.context.auth?.uid;

    const slug = getRouterParam(event, "slug");
    const body = await readBody<CreateCommentDto>(event);

    const data = {
        noteSlug: slug,
        userId: uid,
        content: body.content,
        nickname: body.nickname,
        createdAt: new Date().toISOString(),
    };
    // console.log(data);

    if (!slug || !body.content || !body.nickname || !uid) {
        const res = {
            statusCode: 400,
            statusMessage: "Invalid some params request",
            errors: [] as {}[],
        };
        if (!slug) {
            res.errors.push({
                field: 'slug',
                message: 'Slug is empty',
            });
        }
        if (!body.content) {
            res.errors.push({
                field: 'content',
                message: 'Content is empty',
            });
        }
        if (!body.nickname) {
            res.errors.push({
                field: 'nickname',
                message: 'Nickname is empty',
            });
        }
        if (!uid) {
            res.errors.push({
                field: 'uid',
                message: 'UID is empty',
            });
        }
        throw createError(res);
    }

    await adminDb.collection("notes").doc(slug).collection("comments").doc().set(data);

    return { success: true };
});
