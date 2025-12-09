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
} from "./app/utils/color-scale";

const primary = englishViolet;

const customPreset: Preset<LaraBaseDesignTokens> = {
	css: 'rounded-none hover:rounded-none',
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
		content: {
			borderRadius: '',
		},
		formField: {
			borderRadius: '0',
		},
	},
	components: {
		dataview: {
			css: "border-0 rounded-none",
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
			css: "border-0 rounded-none",
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
		panel: {
			css: 'rounded-none hover:rounded-none',
			root: {
				borderRadius: '0',
			},
			header: {
				borderRadius: '0',
			},
		},
		tag: {
			css: 'rounded-none',
			root: {
				borderRadius: '0',
			},
		},
		chip: {
			css: 'rounded-none',
			root: {
				borderRadius: '0',
			},
		},
		badge: {
			css: 'rounded-none',
			root: {
				borderRadius: '0',
			},
		},
		button: {
			css: 'rounded-none hover:rounded-none',
			root: {
				borderRadius: '0',
				roundedBorderRadius: '0',
			},
		},
		card: {
			root: {
				borderRadius: '0',
			},
		},
		dialog: {
			root: {
				borderRadius: '0',
			},
		},
		menubar: {
			root: {
				borderRadius: '0',
			},
			mobileButton: {
				borderRadius: '0',
			},
			submenu: {
				borderRadius: '0',
			},
			baseItem: {
				borderRadius: '0',
			},
		},
		panelmenu: {
			panel: {
				borderRadius: '0',
			},
		},
	},
};

const Noir = definePreset(BaseTheme, customPreset);

export default Noir;
