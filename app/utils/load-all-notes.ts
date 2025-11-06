import type INoteContent from "./interfaces/INoteContent";

export default async (filters?: { path?: string, limit?: number, latestFirst?: boolean }): Promise<INoteContent[]> => {
	const { data } = await useAsyncData(filters?.path ?? 'notes', async () => {
		let query = queryCollection("notes");
		if (filters?.limit) query = query.limit(filters?.limit);
		if (filters?.latestFirst) query = query.order('date', 'DESC');
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
