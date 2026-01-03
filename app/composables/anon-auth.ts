import type IUserAuth from "~/utils/models/IUserAuth";

export const useAnonAuth = async () => {
	const res = await $fetch<{ data: IUserAuth }>(`/api/auth/anon`, {
		method: "POST",
		headers: {
			Accept: "applications/json",
		},
	});

	// console.log('anon.res:', res);

	return {
		userId: res.data.userId,
		userToken: res.data.userToken,
		userNickname: res.data.nickname,
	};
};
