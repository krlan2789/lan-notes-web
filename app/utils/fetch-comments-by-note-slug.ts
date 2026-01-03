import type IComment from "./models/IComment";

export default async (slug: string) => {
	const { userToken } = await useAnonAuth();
	const res = await $fetch<{ data: IComment[] }>(`/api/comments/${slug}`, {
		method: "GET",
		headers: { Authorization: `Bearer ${userToken}` },
	});
	// console.log('Commenst.fetched:', res);
	return res.data;
};
