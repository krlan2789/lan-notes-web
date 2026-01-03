import BaseResponseDto from "~~/server/dtos/BaseResponseDto";

export default defineEventHandler(async () => {
	const res: BaseResponseDto = {
		status: 200,
		data: {
			userId: "-",
			userToken: "-",
			refreshToken: "-",
			nickname: "",
		},
	};
	return Promise.resolve(res);
});
