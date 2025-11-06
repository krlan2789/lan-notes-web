import { definePreset } from "@primeuix/themes";
import type { LaraBaseDesignTokens } from "@primeuix/themes/lara/base";
import BaseTheme from "@primeuix/themes/lara";
import type { Preset } from "@primeuix/themes/types";
import {
	englishViolet,
	darkSilver,
	charcoal,
	emerald,
	green,
	lime,
	red,
	orange,
	amber,
	yellow,
	teal,
	cyan,
	sky,
	blue,
	indigo,
	violet,
	purple,
	fuchsia,
	pink,
	rose,
} from "./utils/color-scale";

const primary = englishViolet;

const customPreset: Preset<LaraBaseDesignTokens> = {
	primitive: {
		emerald: emerald,
		green: green,
		lime: lime,
		red: red,
		orange: orange,
		amber: amber,
		yellow: yellow,
		teal: teal,
		cyan: cyan,
		sky: sky,
		blue: blue,
		indigo: indigo,
		violet: violet,
		purple: purple,
		fuchsia: fuchsia,
		pink: pink,
		rose: rose,
		neutral: darkSilver,
	},
	semantic: {
		primary: primary,
		colorScheme: {
			light: {
				surface: darkSilver,
				text: {
					color: darkSilver[700],
					hoverColor: darkSilver[400],
					hoverMutedColor: darkSilver[500],
					mutedColor: darkSilver[600],
				},
				primary: {
					color: primary[700],
					contrastColor: primary[50],
					hoverColor: primary[500],
					activeColor: primary[600],
				},
			},
			dark: {
				surface: charcoal,
				text: {
					color: charcoal[700],
					hoverColor: charcoal[400],
					hoverMutedColor: charcoal[500],
					mutedColor: charcoal[600],
				},
				primary: {
					color: primary[200],
					contrastColor: primary[900],
					hoverColor: primary[400],
					activeColor: primary[300],
				},
			},
		},
	},
	components: {
		dataview: {
			css: "border-0",
			paginatorBottom: {
				borderWidth: "0",
				borderColor: "transparent",
			},
			root: {
				borderColor: "transparent",
				borderRadius: "0",
				borderWidth: "0",
				padding: "0",
			},
			footer: {
				background: "transparent",
			},
			content: {
				background: "transparent",
			},
		},
		paginator: {
			css: "border-0",
			root: {
				padding: "0",
			},
			colorScheme: {
				dark: {
					root: {
						background: "transparent",
					},
				},
				light: {
					root: {
						background: "transparent",
					},
				},
			},
		},
	},
};

const Noir = definePreset(BaseTheme, customPreset);

export default Noir;
