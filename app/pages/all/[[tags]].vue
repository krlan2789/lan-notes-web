<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
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
	const filtered = (notes ?? []).filter((n) => {
		let isIncluded: boolean | undefined = false;
		if ((searchKeyword.value == null || searchKeyword.value.length == 0) && selectedTags.value.size == 0) {
			isIncluded = true;
		} else if (searchKeyword.value != null && searchKeyword.value.length > 0) {
			isIncluded =
				n.status?.toLowerCase().includes(searchKeyword.value) ||
				n.title?.toLowerCase().includes(searchKeyword.value) ||
				n.description?.toLowerCase().includes(searchKeyword.value) ||
				n.date?.toLowerCase().includes(searchKeyword.value) ||
				n.tags?.some((t) => t.toLowerCase().includes(searchKeyword.value) || n.tags?.some((t) => selectedTags.value.has(t.toLowerCase())))
		} else {
			isIncluded = n.tags?.some((t) => selectedTags.value.has(t.toLowerCase())) ?? false;
		}
		return isIncluded ?? false;
	});
	return filtered;
});

const onTagSelected = (tags: string[]) => {
	console.debug('selectedTags: ' + tags);
	selectedTags.value = new Set(tags);

	router.replace({
		name: route.name,
		params: {
			tags: Array.from(selectedTags.value).join(','),
		},
		replace: true,
	});
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
		<TagFiltersComponent class="w-full pb-6 pt-12 mx-auto" :tags :initial-selected-tags="selectedTags"
			:force-exapand="selectedTags.size > 0" @selected="onTagSelected" @search="onFindByKeyword" />
		<ListComponent class="w-full pb-8 mx-auto" :items="filteredNotes" paginate />
	</div>
</template>
