export default interface INoteContent {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags?: string[];
}

export interface INoteContentRaw {
	title: string;
	description: string;
	date: string;
	tags?: string[];
	source: {
		url: string;
		type: string;
	};
	status?: string;
}
