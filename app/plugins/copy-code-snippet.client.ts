import useClipboard from "vue-clipboard3";

export default defineNuxtPlugin(() => {
    const { toClipboard } = useClipboard();
    const originalCopyLabel = " Copy ";
    const copiedLabel = "Copied";

    const copyToClipboard = async (codeEl: HTMLElement, button: HTMLButtonElement) => {
        try {
            const content = codeEl.textContent ?? "";
            await toClipboard(content);
            button.textContent = copiedLabel;
            setTimeout(() => (button.textContent = originalCopyLabel), 750);
        } catch (e) {
            console.error("Copy failed", e);
        }
    };

    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("copy-btn")) return;

        const container = target.closest("#markdown-code-container");
        const codeEl = container?.querySelector("pre code") as HTMLElement | null;

        if (codeEl) {
            copyToClipboard(codeEl, target as HTMLButtonElement);
        }
    });
});
