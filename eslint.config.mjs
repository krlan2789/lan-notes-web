// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().override("nuxt/vue", {
	rules: {
		"vue/first-attribute-linebreak": [
			"error",
			{
				singleline: "ignore",
				multiline: "below",
			},
		],
	},
});
