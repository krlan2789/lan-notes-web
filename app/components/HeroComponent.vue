<script lang="ts" setup>
import type { HeroComponentProps } from "./HeroComponent.props";

const props = defineProps<HeroComponentProps>();

const scrollToSection = (): void => {
	const target = props.scrollTarget;
	if (!target) return;

	if (target instanceof Element) {
		target.scrollIntoView({ behavior: "smooth" });
		return;
	}

	if (typeof target === "object" && target !== null && "$el" in target && (target as any).$el instanceof Element) {
		(target as any).$el.scrollIntoView({ behavior: "smooth" });
		return;
	}

	(target as any).scrollIntoView?.({ behavior: "smooth" });
};
</script>

<template>
	<section
		class="max-h-screen h-screen text-surface-600 flex flex-col justify-between align-middle text-center px-4 bg-linear-to-b from-surface-100 from-20% to-surface-0 to-95%"
	>
		<div class="my-8"></div>
		<div class="flex-1 flex flex-col justify-center items-center w-full">
			<div class="flex flex-col justify-center items-center w-full">
				<h1 class="font-bold text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">
					Build, Debug, Write.
				</h1>
				<p class="font-medium text-sm md:text-lg xl:text-xl my-6 md:my-8 xl:my-10">
					A living log of guides, workflows, and documentation.
				</p>
				<!-- <p>A growing archive of notes, guides, and technical insights.</p> -->
			</div>
			<div class="flex flex-row gap-2 sm:gap-4 lg:gap-6 justify-center mx-auto">
				<NuxtLink
					to="/all"
					rel="noopener noreferrer"
					class="w-38 md:w-42 py-1.5 md:py-2 text-sm md:text-base bg-primary text-surface-0 transition duration-200 opacity-100 hover:opacity-80"
				>
					<span class="pi pi-book mr-2 text-sm md:text-base"></span>
					<span>All Notes</span>
				</NuxtLink>
				<Button @click="scrollToSection" variant="outlined" class="w-38 sm:w-42 py-1.5 md:py-2 text-sm md:text-base">
					<span class="pi pi-angle-double-down animate-bounce translate-y-0.5 mr-2 text-sm md:text-base"></span>
					<span>Latest {{ totalNotes < 25 ? totalNotes : 25 }}</span>
				</Button>
			</div>
		</div>
		<div
			class="flex flex-col md:flex-row gap-px md:gap-3 justify-center align-middle my-8 tracking-tight text-xs lg:text-sm xl:text-base"
		>
			<span>96 — kyuroku — 記録 (Nihongo)</span>
			<span class="max-md:rotate-90">⇒</span>
			<span>Archive/Document/Record (English)</span>
			<span class="max-md:rotate-90">⇒</span>
			<span>Catatan/Dokumen (Bahasa)</span>
		</div>
	</section>
</template>
