<script setup lang="ts">
const notes = await loadAllNotes();
const metaTitle = appName + " | Erlan Kurnia";
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
	<TimelineComponent class="max-w-7xl w-full pb-8 mx-auto" :items="notes" />
</template>
