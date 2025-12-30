import type INoteContent from "~/utils/interfaces/INoteContent";

export default async (
	filters?: {
		keyword?: string,
		path?: string,
		limit?: number,
		latestFirst?: boolean,
		earliestFirst?: boolean
	}
): Promise<INoteContent[]> => {
	const fetchnotes = async (): Promise<INoteContent[]> => {
		return await Promise.resolve([]);
	};
	const data = await fetchnotes();

	const notes = data?.map<INoteContent>((e) => ({
		title: e.title,
		date: e.date,
		description: e.description,
		slug: '' + e.slug,
		status: e.status,
		tags: e.tags,
	}));
	return notes ?? [];
}
