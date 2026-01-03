import { H3Event, EventHandlerRequest } from "h3";
import INoteContent, { INoteContentRaw } from "~/utils/models/INoteContent";
import generateSlugFromUrl from "~/utils/generate-slug-from-url";
import containerRegistry from "~~/server/libs/container-registry";
import { INoteService, MarkdownContentTransform } from "~~/server/libs/contracts/INoteService";
import { IS3ClientService, S3ClientServiceToken } from "~~/server/libs/contracts/IS3ClientService";
import { CacheServiceToken, ICacheService } from "~~/server/libs/contracts/ICacheService";
import parseGithubReadme from "../libs/parse-github-readme";

export class NoteService implements INoteService {
	private key = "notes.json";
	private s3ClientService: IS3ClientService;
	private cacheService: ICacheService;

	constructor(event?: H3Event<EventHandlerRequest>) {
		this.s3ClientService = containerRegistry.resolve<IS3ClientService>(S3ClientServiceToken, event) || (() => { throw new Error('Failed to resolve S3ClientService in NoteService'); })();
		this.cacheService = containerRegistry.resolve<ICacheService>(CacheServiceToken, event) || (() => { throw new Error('Failed to resolve CacheService in NoteService'); })();
	}

	public async getListNotes(filters?: {
		tags?: string[] | string;
		lastFirst?: boolean;
		earlyFirst?: boolean;
	}): Promise<INoteContent[] | null> {
		// Fetch notes list from S3
		const obj = await this.s3ClientService.fetchStringObject(this.key);
		const raw = JSON.parse(obj?.data || "[]") as INoteContentRaw[];

		// Filter and map notes
		let notes: INoteContent[] = [];
		if (raw) {
			// Prepare filter tags
			let filterTags: Set<string> | undefined;
			if (filters?.tags) {
				let tagsArray: string[] | undefined = [];
				if (typeof filters.tags === "string") {
					tagsArray =
						filters.tags && filters.tags.includes(",")
							? filters.tags?.split(",").map((t) => t.toLowerCase())
							: filters.tags
								? [filters.tags.toLowerCase()]
								: undefined;
				} else if (Array.isArray(filters.tags)) {
					tagsArray = filters.tags.map((t) => t.toLowerCase());
				}
				filterTags = new Set(tagsArray);
			}
			notes = raw
				.filter((e) => {
					if (filterTags && filterTags.size > 0) {
						return e.tags?.some((tag) => filterTags!.has(tag.toLowerCase()));
					}
					return true;
				})
				.map((e) => {
					const formatted = {
						slug: generateSlugFromUrl(e.source.url),
						title: e.title,
						description: e.description,
						date: e.date,
						tags: e.tags,
					};
					this.cacheService.set<INoteContentRaw>(formatted.slug, e);
					return formatted;
				});
		}

		// Sort notes
		if (notes) {
			if (filters?.lastFirst) {
				notes = notes.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime());
			} else if (filters?.earlyFirst) {
				notes = notes.sort((a, b) => new Date(a.date || "").getTime() - new Date(b.date || "").getTime());
			}
		}
		return notes;
	}

	public async getNoteContentBySlug(slug: string): Promise<MarkdownContentTransform | undefined> {
		const cachedSize = await this.cacheService.count();
		if (cachedSize == 0) {
			await this.getListNotes();
		}
		const cached = await this.cacheService.get<INoteContentRaw>(slug);
		if (cached == null) return undefined;
		const sourceType = cached?.source.type;
		const sourceUrl = cached?.source.url;

		// Fetch markdown content based on type
		let markdownRaw: string | undefined;
		if (sourceType == "github") {
			markdownRaw = await parseGithubReadme(sourceUrl);
		} else if (sourceType == "s3") {
			const obj = await this.s3ClientService.fetchStringObject(sourceUrl);
			markdownRaw = obj?.data;
		} else {
			return undefined;
		}

		const results: MarkdownContentTransform = {
			metadata: {
				title: cached.title,
				description: cached.description,
				date: cached.date,
				tags: cached.tags,
				url: sourceUrl,
				type: sourceType,
			},
			content: markdownRaw,
		};
		// console.log(results.metadata, results.content?.length);
		return results;
	}
}
