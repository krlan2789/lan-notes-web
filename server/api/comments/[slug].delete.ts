import DeleteCommentDto from "~~/server/dtos/DeleteCommentDto";

export default defineEventHandler(async (event) => {
	const slug = getRouterParam(event, "slug");
	const body = await readBody<DeleteCommentDto>(event);

	if (!slug || !body.id) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid request",
		});
	}

	return { success: true };
});
