import type INoteContent from "~/utils/models/INoteContent";

type NotesType = { data: INoteContent[] };

export default async (filters?: {
	keyword?: string;
	tags?: Set<string>;
	limit?: number;
	latestFirst?: boolean;
	earliestFirst?: boolean;
}): Promise<INoteContent[]> => {
	const json = await $fetch<NotesType>("api/notes", {
		method: "GET",
		query: {
			tags: filters?.tags ? Array.from(filters.tags).join(",") : undefined,
		},
	});
	let notesRaw = json.data;

	// Cache notes in localStorage
	if (notesRaw) {
		localStorage.setItem("all-notes", JSON.stringify(notesRaw));
	} else {
		const localNotes = localStorage.getItem("all-notes");
		if (localNotes) {
			notesRaw = JSON.parse(localNotes) as INoteContent[];
		}
	}

	const notes = notesRaw?.map<INoteContent>((e) => ({
		title: e.title,
		date: e.date,
		description: e.description,
		slug: e.slug,
		tags: e.tags,
	}));
	if (filters && notes) {
		let filteredNotes = notes;
		// console.log('filteredNotes:', filteredNotes);
		// if (filters.tags && filters.tags.size > 0) {
		// 	filteredNotes = filteredNotes.filter((note) =>
		// 		note.tags?.some(tag => filters.tags!.has(tag.toLowerCase()))
		// 	);
		// }
		if (filters.keyword) {
			const keyword = filters.keyword.toLowerCase();
			filteredNotes = filteredNotes.filter(
				(note) =>
					note.title.toLowerCase().includes(keyword) ||
					note.description.toLowerCase().includes(keyword) ||
					note.date.toLowerCase().includes(keyword) ||
					note.tags?.some((tag) => tag.toLowerCase().includes(keyword)),
			);
		}
		if (filters.latestFirst) {
			filteredNotes = filteredNotes.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime());
		} else if (filters.earliestFirst) {
			filteredNotes = filteredNotes.sort((a, b) => new Date(a.date || "").getTime() - new Date(b.date || "").getTime());
		}
		return filteredNotes;
	}
	return notes ?? [];
};
