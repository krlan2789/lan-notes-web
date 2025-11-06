<script lang="ts" setup>
const route = useRoute();
const selectedTags = ref(new Set<string>());
if (route.params.tags instanceof Array) {
	selectedTags.value = new Set<string>(route.params.tags.map((val) => val.toLowerCase()));
} else if (typeof route.params.tags == "string") {
	selectedTags.value = new Set<string>(route.params.tags.toLowerCase().split(","));
} else {
	selectedTags.value?.clear();
}
selectedTags.value?.delete("");

// const { data } = await useAsyncData(route.path, async () => {
// 	let query = queryCollection("notes");
// 	return await query.all();
// });

// const notes = data.value?.map<INoteContent>((e) => ({
// 	title: e.title,
// 	date: e.date,
// 	description: e.description,
// 	slug: e.path,
// 	status: e.status,
// 	tags: e.tags,
// }));
const notes = await loadAllNotes({ path: route.path });
const tags = [...new Set((notes ?? []).flatMap((n) => n.tags ?? []))];

const filteredNotes = computed(() => {
	return selectedTags.value.size > 0
		? (notes ?? []).filter((n) => n.tags?.some((t) => selectedTags.value.has(t)))
		: (notes ?? []);
});

const onTagSelected = (tags: string[]) => {
	// console.log(tags);
	selectedTags.value = new Set(tags);
};

const metaTitle = `All Notes - ${appName} | Erlan Kurnia`;
const metaDesc = "Erlan Kurnia's personal notes in programming world";
useSeoMeta({
	title: metaTitle,
	ogTitle: metaTitle,
	description: metaDesc,
	ogDescription: metaDesc,
});
</script>

<template>
	<TagFiltersComponent class="max-w-7xl w-full pb-6 px-3 pt-4 mx-auto" :tags @selected="onTagSelected" />
	<ListComponent class="max-w-7xl w-full pb-8 px-3 mx-auto" :items="filteredNotes" />
</template>
