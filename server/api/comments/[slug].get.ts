import IComment from "~~/app/utils/models/IComment";
import BaseResponseDto from "~~/server/dtos/BaseResponseDto";
import containerRegistry from "~~/server/libs/container-registry";
import { CommentServiceToken, ICommentService } from "~~/server/libs/contracts/ICommentService";

export default defineEventHandler(async (event): Promise<BaseResponseDto> => {
	let res: BaseResponseDto = {
		status: 500,
		cause: [{ field: "exception", message: "Some service no found" }],
	};

	try {
		const host = getRequestURL(event).host;
		// const userToken = '' + event.context.auth?.userToken;
		const slug = getRouterParam(event, "slug");
		if (!slug) {
			res = {
				status: 400,
				cause: [{ field: "slug", message: "Required parameter" }],
			};
			throw createError(res);
		}

		const commentService = containerRegistry.resolve<ICommentService>(CommentServiceToken, event);
		if (!commentService) {
			throw createError(res);
		}
		const docs = await commentService.getComments(host, slug);
		return {
			status: 200,
			data: docs as IComment[],
		};
	} catch (err) {
		res.cause = [{ field: "exception", message: JSON.stringify(err) }];
		throw createError(res);
	}
});
