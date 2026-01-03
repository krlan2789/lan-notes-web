import type INoteContent from "~/utils/models/INoteContent";

export const NoteServiceToken = "INoteService";

export type MarkdownContentTransform = {
	metadata: { title: string, description: string, tags?: string[], date?: string, url?: string, type?: string };
	content?: string;
};

export interface INoteService {
	getListNotes(filters?: {
		tags?: string[] | string;
		lastFirst?: boolean;
		earlyFirst?: boolean;
	}): Promise<INoteContent[] | null>;
	getNoteContentBySlug(slug: string): Promise<MarkdownContentTransform | undefined>;
}
