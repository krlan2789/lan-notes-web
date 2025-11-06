import { PageCollectionItemBase } from "@nuxt/content";

// types/content.d.ts
declare module "@nuxt/content/dist/runtime/types" {
	interface MarkdownParsedContent extends PageCollectionItemBase {
		title: string;
		description?: string;
		date?: string;
		tags?: string[];
		status?: string;
	}
}
