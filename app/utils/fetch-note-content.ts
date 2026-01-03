type NoteContentType = {
	content?: string;
	metadata: { title: string, description: string, tags?: string[], date?: string }
};

export default async (slug: string): Promise<NoteContentType | undefined> => {
	const { data } = await useAsyncData(slug, async () => {
		let json: NoteContentType | undefined;
		await $fetch<{ data: NoteContentType }>(`api/notes/${slug}`)
			.then(res => {
				json = res.data;
			})
			.catch(res => {
				console.error(res);
			});
		return await Promise.resolve(json);
	});
	return data.value;
};
