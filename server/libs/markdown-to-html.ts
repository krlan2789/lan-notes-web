// import 'highlight.js/styles/stackoverflow-dark.min.css';
import hljs from "highlight.js/lib/core";
import hljsApache from "highlight.js/lib/languages/apache";
import hljsBash from "highlight.js/lib/languages/bash";
import hljsCsharp from "highlight.js/lib/languages/csharp";
import hljsGradle from "highlight.js/lib/languages/gradle";
import hljsHttp from "highlight.js/lib/languages/http";
import hljsIni from "highlight.js/lib/languages/ini";
import hljsJavascript from "highlight.js/lib/languages/javascript";
import hljsNginx from "highlight.js/lib/languages/nginx";
import hljsProp from "highlight.js/lib/languages/properties";
import hljsRuby from "highlight.js/lib/languages/ruby";
import hljsShell from "highlight.js/lib/languages/shell";
import hljsXml from "highlight.js/lib/languages/xml";
import hljsYaml from "highlight.js/lib/languages/yaml";
import MarkdownIt from "markdown-it";
import type { Token } from "markdown-it/index.js";

hljs.registerLanguage("apache", hljsApache);
hljs.registerLanguage("bash", hljsBash);
hljs.registerLanguage("csharp", hljsCsharp);
hljs.registerLanguage("gradle", hljsGradle);
hljs.registerLanguage("http", hljsHttp);
hljs.registerLanguage("ini", hljsIni);
hljs.registerLanguage("javascript", hljsJavascript);
hljs.registerLanguage("nginx", hljsNginx);
hljs.registerLanguage("properties", hljsProp);
hljs.registerLanguage("ruby", hljsRuby);
hljs.registerLanguage("shell", hljsShell);
hljs.registerLanguage("xml", hljsXml);
hljs.registerLanguage("yml", hljsYaml);

class MarkdownToHtml {
	private mdit = new MarkdownIt({
		breaks: true,
		html: true,
		typographer: true,
	});

	private originalCopyLabel = " Copy ";
	private rawCodeList: string[] = [];

	public parse(raw: string): Token[] {
		return this.mdit.parse(raw, {});
	}

	public render(tokens: Token[]): string {
		const html = this.mdit.renderer.render(tokens, this.mdit.options, {});
		return html;
	}

	public addCodeHighlightAndCopyBtn(tokens: Token[]): Token[] {
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];

			if (token.type === "fence" && token.tag === "code") {
				const originalContent = token.info ? hljs.highlight(token.content, { language: token.info }).value : hljs.highlightAuto(token.content).value;
				const html = `
					<div id="markdown-code-container" class="relative hljs">
						<span class="code-snippet-hint">
							Type or copy the command/code below
						</span>
						<button type="button" id="${'btn-copy-code-' + this.rawCodeList.length}" class="copy-btn">
							${this.originalCopyLabel}
						</button>
						<pre id="markdown-code-content" class="">
							<code class="">${originalContent}</code>
						</pre>
					</div>
				`;
				this.rawCodeList.push(token.content);
				token.type = "html_inline";
				token.content = html;
			}
		}
		return tokens;
	}

	public rewriteGithubAssets(tokens: Token[], sourceUrl: string): Token[] {
		for (const token of tokens) {
			const rawContentUrl = sourceUrl.replace("github.com", "raw.githubusercontent.com");
			if ((token.type === "html_block" || token.type === "html_inline") && token.content.includes('src="./')) {
				token.content = token.content.replace(/src="\.\//g, `src="${rawContentUrl}/main/`);
			}
			// Handle Markdown image tokens too
			if (token.type === "image" && token.attrGet("src")?.startsWith("./")) {
				const src = token.attrGet("src")!;
				token.attrSet("src", src.replace("./", `${rawContentUrl}/main/`));
			}
		}
		return tokens;
	}

	public rewriteS3Assets(tokens: Token[], baseUrl: string = 'https://cdn.kiroku.erlankurnia.laness.id/'): Token[] {
		for (const token of tokens) {
			if ((token.type === "html_block" || token.type === "html_inline") && token.content.includes('src="./')) {
				token.content = token.content.replace(/src="\.\//g, `src="${baseUrl}`);
			}
			// Handle Markdown image tokens too
			if (token.type === "image" && token.attrGet("src")?.startsWith("./")) {
				const src = token.attrGet("src")!;
				token.attrSet("src", src.replace("./", baseUrl));
			}
		}
		return tokens;
	}
}

export default new MarkdownToHtml();
