import tailwindcss from "@tailwindcss/vite";
import Noir from "./privmevue.theme";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	ssr: false,
	devtools: { enabled: true },
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
		"/img/**": { static: true },
		"/files/**": { static: true },
		// '/notes/**': { redirect: '/**', },
	},
	pages: {
		pattern: ["**/*.vue", "!**/components/**"],
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
		"@nuxt/scripts",
		"@primevue/nuxt-module",
		"@nuxt/fonts",
		"nuxt-gtag",
		"@artmizu/nuxt-prometheus",
	],
	primevue: {
		components: {
			exclude: ["editor", "toast", "usetoast"],
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
	gtag: {
		initMode: "manual",
		id: "G-81JLN3PTGM",
		loadingStrategy: "async",
	},
	vite: {
		plugins: [tailwindcss()],
		logLevel: "info",
		build: {
			sourcemap: true,
		},
	},
	nitro: {
		preset: "bun",
	},
});
