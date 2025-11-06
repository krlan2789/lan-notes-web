import type INoteContent from "./interfaces/INoteContent";

export default async (path?: string, limit?: number): Promise<INoteContent[]> => {
	const { data } = await useAsyncData(path ?? 'notes', async () => {
		let query = queryCollection("notes");
		if (limit) query = query.limit(limit);
		return await query.all();
	});

	const notes = data.value?.map<INoteContent>((e) => ({
		title: e.title,
		date: e.date,
		description: e.description,
		slug: e.path,
		status: e.status,
		tags: e.tags,
	}));
	console.log(notes);
	return notes ?? [];
}
