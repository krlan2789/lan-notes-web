import BaseResponseDto from "~~/server/dtos/BaseResponseDto";
import CreateCommentDto from "~~/server/dtos/CreateCommentDto";
import { createComment } from "~~/server/libs/firebase-rest";
import NoteCommentModel from "~~/server/models/NoteCommentModel";
// import { adminDb } from "../../libs/firebase-admin";

export default defineEventHandler(async (event): Promise<BaseResponseDto> => {
    const host = getRequestURL(event).host;
    // const userId = event.context.auth?.userId;
    // const userToken = event.context.auth?.userToken;

    const slug = getRouterParam(event, "slug");
    const body = await readBody<CreateCommentDto>(event);

    let res: BaseResponseDto = {
        statusCode: 400,
    };

    if (!slug || !body.content || !body.nickname /*|| !userId*/) {
        res.statusMessage = "Invalid some params request";
        res.errors = [];
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
        // if (!userId) {
        //     res.errors.push({
        //         field: 'uid',
        //         message: 'UID is empty',
        //     });
        // }
        throw createError(res);
    }

    const data: NoteCommentModel = {
        noteSlug: slug ?? '',
        // userId: userId,
        content: body.content,
        nickname: body.nickname,
        createdAt: new Date().toISOString(),
    };
    // console.log(data);

    await createComment(host, 'userToken', data);
    res.statusCode = 200;
    res.statusMessage = 'Success create comment';
    return res;
});
