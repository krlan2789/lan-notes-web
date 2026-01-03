import BaseResponseDto from "~~/server/dtos/BaseResponseDto";
import containerRegistry from "~~/server/libs/container-registry";
import { INoteService, NoteServiceToken } from "~~/server/libs/contracts/INoteService";
import mdToHtml from "~~/server/libs/markdown-to-html";

export default defineEventHandler(async (event): Promise<BaseResponseDto> => {
	let res: BaseResponseDto = {
		status: 500,
		cause: [{ field: "exception", message: 'Some service no found' }],
	};

	const slug = getRouterParam(event, "slug") ?? "";

	const noteService = containerRegistry.resolve<INoteService>(NoteServiceToken, event);
	if (!noteService) {
		console.error(res);
		throw createError(res);
	}
	const markdownContent = await noteService.getNoteContentBySlug(slug);

	// Convert markdown to HTML
	if (markdownContent && markdownContent.content) {
		// Apply transformations
		let tokens = mdToHtml.parse(markdownContent.content);
		tokens = mdToHtml.addCodeHighlightAndCopyBtn(tokens);
		if (markdownContent.metadata.type == "github") tokens = mdToHtml.rewriteGithubAssets(tokens, markdownContent.metadata.url + "");
		else if (markdownContent.metadata.type == "s3") tokens = mdToHtml.rewriteS3Assets(tokens);
		// Render HTML as string
		const html = mdToHtml.render(tokens);
		return {
			status: 200,
			data: {
				metadata: markdownContent.metadata,
				content: html,
			},
		};
	} else {
		res.cause = [{ field: "slug", message: "Note not found" }];
		console.error(res);
		throw createError(res);
	}
	// try {
	// } catch (err) {
	// 	res.cause = [{ field: "exception", message: JSON.stringify(err) }];
	// 	console.error(res);
	// 	throw createError(res);
	// }
});
