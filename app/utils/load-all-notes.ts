import type { NotesCollectionItem } from "@nuxt/content";
import type INoteContent from "./interfaces/INoteContent";

export default async (
	filters?: {
		keyword?: string,
		path?: string,
		limit?: number,
		latestFirst?: boolean,
		earliestFirst?: boolean
	}
): Promise<INoteContent[]> => {
	const fetchnotes = async (): Promise<NotesCollectionItem[]> => {
		let query = queryCollection("notes");
		if (filters?.keyword) {
			const keyword = filters.keyword.toLowerCase();
			query = query
				.orWhere(query => query
					.where('title', 'LIKE', `%${keyword}%`)
					.where('date', 'LIKE', `%${keyword}%`)
					.where('description', 'LIKE', `%${keyword}%`)
					.where('status', 'LIKE', `%${keyword}%`)
					.where('tags', 'IN', [keyword])
				);
		}
		if (filters?.limit) query = query.limit(filters?.limit);
		if (filters?.latestFirst) query = query.order('date', 'DESC');
		else if (filters?.earliestFirst) query = query.order('date', 'ASC');
		return await query.all();
	};
	const data = await fetchnotes();

	const notes = data?.map<INoteContent>((e) => ({
		title: e.title,
		date: e.date,
		description: e.description,
		slug: e.path,
		status: e.status,
		tags: e.tags,
	}));
	// console.log(notes);
	return notes ?? [];
}
