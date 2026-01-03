<script setup lang="ts">
import "highlight.js/styles/stackoverflow-dark.min.css";
import { DialogCommentEventName } from "~/components/DialogCommentComponent.props";

definePageMeta({
	layout: "notes",
});

const route = useRoute();
const { eventBus } = useEventBus();

const { data: page } = await useAsyncData(route.path, async () => {
	console.log(route.params.slug);
	const res = await fetchNoteContent(route.params.slug as string);
	// console.log("Fetched page data:", res?.data);
	return await Promise.resolve(res);
});
if (!page.value) {
	throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

const metaTitle = `${page.value.metadata?.title} - ${appTitle}`;
const metaDesc = page.value.metadata?.description;
useSeoMeta({
	title: metaTitle,
	ogTitle: metaTitle,
	description: metaDesc,
	ogDescription: metaDesc,
	articleTag: () => page.value?.metadata?.tags,
});
</script>

<template>
	<section v-if="page" id="markdown" class="container flex flex-col mb-16 mt-14 sm:mt-18 px-6 xl:px-4">
		<div id="markdown-header" class="flex flex-col gap-2 w-full px-0 pt-4">
			<h1 v-if="page.metadata?.title" class="w-full text-4xl font-semibold" v-html="page.metadata?.title"></h1>
			<div v-if="page.metadata?.tags && page.metadata?.tags.length > 0"
				class="flex flex-wrap justify-center w-full gap-4">
				<template v-for="tag of page.metadata?.tags">
					<NuxtLink :to="'/all/' + tag">
						<Tag :key="tag" :value="'#' + tag" class="text-xs rounded-none"
							:severity="severityOptions[page.metadata?.tags.indexOf(tag) % severityOptions.length]"
							rounded>
						</Tag>
					</NuxtLink>
				</template>
			</div>
			<p v-if="page.metadata?.description" class="w-full py-2" v-html="page.metadata?.description"></p>
		</div>
		<div id="markdown-content" v-html="page.content"></div>
		<DialogCommentComponent />
	</section>
	<div class="fixed bottom-6 right-6 xl:right-1/2 xl:translate-x-156 w-auto">
		<Button class="w-auto" size="small" aria-label="Comment" @click="eventBus.$emit(DialogCommentEventName.OnShow)">
			<template #default>
				<span class="pi pi-comments"></span>
				<span class="text-xs italic"> CTRL+/ </span>
			</template>
		</Button>
	</div>
</template>
