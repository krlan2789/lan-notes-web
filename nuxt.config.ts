import tailwindcss from "@tailwindcss/vite";
import Noir from "./privmevue.theme";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	ssr: false,
	devtools: { enabled: true },
	// runtimeConfig: {
	// 	public: {
	// 		firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
	// 		firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
	// 		firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	// 		firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	// 		firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
	// 		firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	// 	},
	// },
	css: ["~/assets/css/tailwind.css"],
	app: {
		head: {
			title: "Notes - Erlan Kurnia",
			link: [
				{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
				{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
				{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
				{ rel: "manifest", href: "/site.webmanifest" },
			],
		},
	},
	routeRules: {
		'/img/**': { static: true },
		'/files/**': { static: true },
		// '/notes/**': { redirect: '/**', },
	},
	pages: {
		pattern: ["**/*.vue", "!**/components/**"],
	},
	content: {
		// documentDriven: true,
		build: {
			markdown: {
				toc: {
					searchDepth: 1,
				},
				highlight: {
					theme: "ayu-dark",
					langs: [
						"bash",
						"csharp",
						"shell",
						"ini",
						"properties",
						"javascript",
						"typescript",
						"php",
						"vue",
						"cmd",
						"cmake",
						"kotlin",
						"http",
						"xml",
						"ruby",
						"nginx",
						"apache",
					],
				},
			},
		},
	},
	components: [
		"~/components",
		{
			path: "~/pages",
			pattern: "**/components/**",
			pathPrefix: false,
		},
	],
	modules: [
		"@nuxt/eslint",
		"@nuxt/content",
		// "@nuxt/ui",
		"@nuxt/scripts",
		// "@nuxt/image",
		"@primevue/nuxt-module",
		"@nuxt/fonts",
	],
	primevue: {
		components: {
			exclude: ['editor', 'toast', 'usetoast'],
		},
		usePrimeVue: true,
		autoImport: true,
		options: {
			ripple: true,
			inputVariant: "filled",
			theme: {
				preset: Noir,
				options: {
					prefix: "p",
					darkModeSelector: ".my-app-dark",
					cssLayer: {
						name: "primevue",
						order: "theme, base, primevue",
					},
				},
			},
		},
	},
	vite: {
		plugins: [tailwindcss()],
		logLevel: 'info',
		build: {
			sourcemap: true,
		},
	},
	nitro: {
		preset: 'cloudflare-pages'
	},
});
