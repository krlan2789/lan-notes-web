import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		notes: defineCollection({
			type: "page",
			source: {
				include: "**",
				exclude: [],
			},
			schema: z.object({
				title: z.string(),
				description: z.string().optional(),
				date: z.string().optional(),
				tags: z.array(z.string()).optional(),
				status: z.string().optional(),
				github: z.string().optional(),
			}),
		}),
	},
});
