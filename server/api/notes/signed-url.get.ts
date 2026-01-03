import BaseResponseDto from "~~/server/dtos/BaseResponseDto";
import containerRegistry from "~~/server/libs/container-registry";
import { IS3ClientService, S3ClientServiceToken } from "~~/server/libs/contracts/IS3ClientService";

export default defineEventHandler(async (event): Promise<BaseResponseDto> => {
	let res: BaseResponseDto = {
		status: 500,
		cause: [{ field: "exception", message: 'Some service no found' }],
	};

	try {
		const slug = getRouterParam(event, "slug");
		if (!slug) {
			res = { status: 400, cause: [{ field: "slug", message: "Required parameter" }] };
			throw createError(res);
		}

		const s3ClientService = containerRegistry.resolve<IS3ClientService>(S3ClientServiceToken, event);
		if (!s3ClientService) {
			throw createError(res);
		}
		const url = await s3ClientService.generateSignedUrl(slug);
		return { status: 200, data: url };
	} catch (err) {
		res.cause = [{ field: "exception", message: JSON.stringify(err) }];
		throw createError(res);
	}
});
