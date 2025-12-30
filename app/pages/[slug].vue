<script setup lang="ts">
import { DialogCommentEventName } from '~/components/DialogCommentComponent.props';

definePageMeta({
	layout: "notes",
});

const route = useRoute();
const { eventBus } = useEventBus();

const { data: localPage } = await useAsyncData(route.path, async () => {
	console.log(route.path);
	const data = await loadAllNotes().then((notes) =>
		notes.find((note) => note.slug === route.params.slug)
	);
	return await Promise.resolve(data);
});
if (!localPage.value) {
	throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

const metaTitle = `${localPage.value.title} - ${appTitle}`;
const metaDesc = localPage.value.description;
useSeoMeta({
	title: metaTitle,
	ogTitle: metaTitle,
	description: metaDesc,
	ogDescription: metaDesc,
	articleTag: () => localPage.value?.tags,
});
// const headline = computed(() => findPageHeadline(navigation?.value, localPage.value?.path));
</script>

<template>
	<section v-if="localPage" id="markdown" class="container flex flex-col mb-16 mt-14 sm:mt-18 px-6 xl:px-4">
		<div id="markdown-header" class="flex flex-col gap-2 w-full px-0 pt-4">
			<h1 v-if="localPage.title" class="w-full text-4xl font-semibold" v-html="localPage.title"></h1>
			<div v-if="localPage.tags && localPage.tags.length > 0" class="flex flex-wrap justify-center w-full gap-4">
				<template v-for="tag of localPage.tags">
					<NuxtLink :to="'/all/' + tag">
						<Tag :key="tag" :value="'#' + tag" class="text-xs rounded-none"
							:severity="severityOptions[localPage.tags.indexOf(tag) % severityOptions.length]" rounded>
						</Tag>
					</NuxtLink>
				</template>
			</div>
			<p v-if="localPage.description" class="w-full py-2" v-html="localPage.description"></p>
		</div>
		<div id="markdown-content">
			<ContentRenderer v-if="localPage" :value="localPage" />
		</div>
		<DialogCommentComponent />
	</section>
	<div class="fixed bottom-6 right-6 xl:right-1/2 xl:translate-x-156 w-auto">
		<Button class="w-auto" size="small" aria-label="Comment" @click="eventBus.$emit(DialogCommentEventName.OnShow)">
			<template #default>
				<span class="pi pi-comments"></span>
				<span class="text-xs italic">
					CTRL+/
				</span>
			</template>
		</Button>
	</div>
</template>
