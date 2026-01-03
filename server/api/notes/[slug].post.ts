import BaseResponseDto from "~~/server/dtos/BaseResponseDto";
import containerRegistry from "~~/server/libs/container-registry";
import { IS3ClientService, S3ClientServiceToken } from "~~/server/libs/contracts/IS3ClientService";

export default defineEventHandler(async (event): Promise<BaseResponseDto> => {
	let res: BaseResponseDto = {
		status: 500,
		cause: [{ field: "exception", message: 'Some service no found' }],
	};

	try {
		const form = await readMultipartFormData(event);
		if (!form) {
			res = { status: 400, cause: [{ field: "file", message: "No file uploaded" }] };
			throw createError(res);
		}

		const file = form[0];
		const key = file.filename;
		if (!key) {
			res = { status: 400, cause: [{ field: "file", message: "Invalid filename" }] };
			throw createError(res);
		}

		const s3ClientService = containerRegistry.resolve<IS3ClientService>(S3ClientServiceToken, event);
		if (!s3ClientService) {
			throw createError(res);
		}
		await s3ClientService.sendCustomObject(key, file.data, file.type);
		return { status: 200, data: key };
	} catch (err) {
		res.cause = [{ field: "exception", message: JSON.stringify(err) }];
		throw createError(res);
	}
});
