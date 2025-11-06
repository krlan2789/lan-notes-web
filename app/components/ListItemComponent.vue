<script lang="ts" setup>
import type { ListItemComponentProps } from "./ListItemComponent.props";

defineProps<ListItemComponentProps>();
</script>

<template>
	<NuxtLink :id="'card' + slug" :to="slug ? slug : '/'">
		<div class="px-2 mb-2 -mx-2 flex flex-row w-full">
			<h4 class="text-lg font-semibold text-primary flex-1 grow" v-html="title"></h4>

			<p v-if="date" class="text-[10px] text-surface-500 opacity-80 leading-loose lg:text-xs w-auto">
				{{ new Date(date).toDateString() }}
			</p>
		</div>
		<p class="text-sm text-surface-500 leading-tight line-clamp-1" v-html="description"></p>
		<div class="flex flex-row mt-4">
			<div v-if="tags" class="flex-1 grow flex flex-wrap gap-2">
				<Tag v-for="tag in tags" :key="tag" :value="'#' + tag" class="text-xs"
					:severity="severityOptions[tags.indexOf(tag) % severityOptions.length]" rounded></Tag>
			</div>
			<p class="hidden md:block text-sm pt-1 align-text-bottom">Read more</p>
		</div>
	</NuxtLink>
</template>
