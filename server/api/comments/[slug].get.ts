import { getComments } from "../../libs/firebase-rest";
import IComment from "../../../app/utils/models/IComment";
import BaseResponseDto from "~~/server/dtos/BaseResponseDto";

export default defineEventHandler(async (event) => {
	const host = getRequestURL(event).host;
	// const userToken = '' + event.context.auth?.userToken;
	const slug = getRouterParam(event, "slug");
	let res: BaseResponseDto = {
		statusCode: 400,
	};
	if (!slug) {
		res.statusMessage = "Slug parameter is required";
		throw createError(res);
	}

	const docs = await getComments(host, 'userToken', slug);
	res.data = docs as IComment[];
	return res;
});
