<script lang="ts" setup>
const route = useRoute();
const selectedTags = ref(new Set<string>());
const searchKeyword = ref('');
if (route.params.tags instanceof Array) {
	selectedTags.value = new Set<string>(route.params.tags.map((val) => val.toLowerCase()));
} else if (typeof route.params.tags == "string") {
	selectedTags.value = new Set<string>(route.params.tags.toLowerCase().split(","));
} else {
	selectedTags.value?.clear();
}
selectedTags.value?.delete("");

const notes = await loadAllNotes({ path: route.path });
const tags = [...new Set((notes ?? []).flatMap((n) => n.tags ?? []))];

const filteredNotes = computed(() => {
	return selectedTags.value.size > 0 || searchKeyword.value.length > 0
		? (notes ?? []).filter((n) =>
			n.status?.toLowerCase().includes(searchKeyword.value) ||
			n.title?.toLowerCase().includes(searchKeyword.value) ||
			n.description?.toLowerCase().includes(searchKeyword.value) ||
			n.date?.toLowerCase().includes(searchKeyword.value) ||
			n.tags?.some((t) => selectedTags.value.has(t) || t.toLowerCase().includes(searchKeyword.value))
		)
		: (notes ?? []);
});

const onTagSelected = (tags: string[]) => {
	selectedTags.value = new Set(tags);
};

const onFindByKeyword = (keyword: string) => {
	searchKeyword.value = keyword.toLowerCase();
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
	<div class="container px-6 xl:px-4 mt-14 sm:mt-18">
		<TagFiltersComponent class="w-full pb-6 pt-12 mx-auto" :tags @selected="onTagSelected"
			@search="onFindByKeyword" />
		<ListComponent class="w-full pb-8 mx-auto" :items="filteredNotes" paginate />
	</div>
</template>
