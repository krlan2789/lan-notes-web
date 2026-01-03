import BaseResponseDto from "~~/server/dtos/BaseResponseDto";
import UpdateNicknameDto from "~~/server/dtos/UpdateNicknameDto";
import containerRegistry from "~~/server/libs/container-registry";
import { FirebaseServiceToken, IFirebaseService } from "~~/server/libs/contracts/IFirebaseService";

export default defineEventHandler(async (event): Promise<BaseResponseDto> => {
	let res: BaseResponseDto = {
		status: 500,
		cause: [{ field: "exception", message: 'Some service no found' }],
	};

	try {
		const userToken = "" + event.context.auth?.userToken;
		const { nickname } = await readBody<UpdateNicknameDto>(event);

		if (!userToken || !nickname) {
			res = {
				status: 400,
				cause: [
					{ field: 'userToken', message: 'Required parameter' },
					{ field: 'nickname', message: 'Required parameter' },
				]
			};
			throw createError(res);
		}

		const firebaseService = containerRegistry.resolve<IFirebaseService>(FirebaseServiceToken, event);
		if (!firebaseService) {
			throw createError(res);
		}
		const updatedUser = await firebaseService.updateDisplayName(userToken, nickname);
		return { status: 200, data: updatedUser };
	} catch (err) {
		res.cause = [{ field: "exception", message: JSON.stringify(err) }];
		throw createError(res);
	}
});
