import BaseResponseDto from "~~/server/dtos/BaseResponseDto";
import containerRegistry from "~~/server/libs/container-registry";
import { CacheServiceToken, ICacheService } from "~~/server/libs/contracts/ICacheService";
import { INoteService, NoteServiceToken } from "~~/server/libs/contracts/INoteService";

export default defineEventHandler(async (event): Promise<BaseResponseDto> => {
	let res: BaseResponseDto = {
		status: 500,
		cause: [{ field: "exception", message: 'Some service no found' }],
	};

	try {
		// const cacheService = containerRegistry.resolve<ICacheService>(CacheServiceToken, event);
		// await cacheService?.clear();
		const tags = getQuery(event).tags as string | undefined;
		const noteService = containerRegistry.resolve<INoteService>(NoteServiceToken, event);
		if (!noteService) {
			throw createError(res);
		}
		const notes = await noteService.getListNotes({ tags });
		// console.log("Notes fetched in API:", notes);
		return { status: 200, data: notes };
	} catch (err) {
		res.cause = [{ field: "exception", message: JSON.stringify(err) }];
		throw createError(res);
	}
});
