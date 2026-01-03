import BaseResponseDto from "~~/server/dtos/BaseResponseDto";
import CreateCommentDto from "~~/server/dtos/CreateCommentDto";
import NoteCommentModel from "~~/server/models/NoteCommentModel";
import containerRegistry from "~~/server/libs/container-registry";
import { CommentServiceToken, ICommentService } from "~~/server/libs/contracts/ICommentService";

export default defineEventHandler(async (event): Promise<BaseResponseDto> => {
	let res: BaseResponseDto = {
		status: 500,
		cause: [{ field: "exception", message: 'Some service no found' }],
	};

	try {
		const host = getRequestURL(event).host;
		const slug = getRouterParam(event, "slug");
		const body = await readBody<CreateCommentDto>(event);

		res.status = 400;

		if (!slug || !body.content || !body.nickname /*|| !userId*/) {
			res.statusMessage = "Invalid some params request";
			res.cause = [];
			if (!slug) {
				res.cause.push({
					field: "slug",
					message: "Slug is empty",
				});
			}
			if (!body.content) {
				res.cause.push({
					field: "content",
					message: "Content is empty",
				});
			}
			if (!body.nickname) {
				res.cause.push({
					field: "nickname",
					message: "Nickname is empty",
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
			noteSlug: slug ?? "",
			// userId: userId,
			content: body.content,
			nickname: body.nickname,
			createdAt: new Date().toISOString(),
		};

		const commentService = containerRegistry.resolve<ICommentService>(CommentServiceToken, event);
		if (!commentService) {
			throw createError(res);
		}
		await commentService.createComment(host, data);
		res.status = 200;
		res.statusMessage = "Success create comment";
		return res;
	} catch (err) {
		res.cause = [{ field: "exception", message: JSON.stringify(err) }];
		throw createError(res);
	}
});
