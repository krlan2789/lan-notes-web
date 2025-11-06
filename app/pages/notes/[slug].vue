<script setup lang="ts">
// import type { ContentNavigationItem } from "@nuxt/content";
// import { findPageHeadline } from "@nuxt/content/utils";

definePageMeta({
	layout: "notes",
});

const route = useRoute();
// const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const { data: localPage } = await useAsyncData(route.path, async () => {
	return await queryCollection("notes").path(route.path).first();
});
if (!localPage.value) {
	throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

// const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
// 	return queryCollectionItemSurroundings("notes", route.path, {
// 		fields: ["description"],
// 	});
// });

const metaTitle = `${localPage.value.title} - ${appName} | Erlan Kurnia`;
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
	<UPage v-if="localPage" id="markdown" class="max-w-7xl mx-auto mb-16 px-4">
		<UPageHeader id="markdown-header" :title="localPage.title" :description="localPage.description" class="p-0">
			<template #links>
				<div v-if="localPage.tags && localPage.tags.length > 0" class="flex flex-wrap justify-center w-full gap-4">
					<template v-for="tag of localPage.tags">
						<NuxtLink :to="'/notes/' + tag">
							<Tag
								:key="tag"
								:value="'#' + tag"
								class="text-xs"
								:severity="severityOptions[localPage.tags.indexOf(tag) % severityOptions.length]"
								rounded
							>
							</Tag>
						</NuxtLink>
					</template>
				</div>
			</template>
		</UPageHeader>
		<template #right>
			<UPageBody id="markdown-content">
				<ContentRenderer v-if="localPage" :value="localPage" />
				<!-- <USeparator v-if="surround?.length" /> -->
				<!-- <UContentSurround :surround="surround" /> -->
			</UPageBody>
		</template>
	</UPage>
</template>
