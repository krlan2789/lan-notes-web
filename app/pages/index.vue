<script setup lang="ts">
const targetComponent = ref<Element | ComponentPublicInstance | null>(null);

const notes = await fetchAllNotes({ latestFirst: true });
const metaTitle = appTitle;
const metaDesc = appTagline;
useSeoMeta({
	title: metaTitle,
	ogTitle: metaTitle,
	description: metaDesc,
	ogDescription: metaDesc,
	ogUrl: "https://erlankurnia.laness.id/",
});
</script>

<template>
	<HeroComponent :scroll-target="targetComponent" :total-notes="notes.length" class="w-full mx-auto" />
	<TimelineComponent :ref="(ref) => (targetComponent = ref)" class="container pt-14 md:pt-18" :items="notes" />
</template>
