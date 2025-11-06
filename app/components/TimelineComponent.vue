<script setup lang="ts">
import type INoteContent from "~/utils/interfaces/INoteContent";
import type { TimelineComponentProps } from "./TimelineComponent.props";

const props = defineProps<TimelineComponentProps>();

// const tags = [...new Set([...props.items.flatMap((n) => n.tags)])];
</script>

<template>
	<div class="flex flex-col px-2 mx-auto font-normal w-full">
		<Timeline :value="items" :pt="{
			eventContent: {
				class: 'mb-8 ml-4 lg:mb-12 lg:ml-12 rounded-lg p-2 lg:p-4 bg-surface-100 7xl:flex-[4.7] 7xl:grow-[4.7] 7xl:shrink-[4.7] shadow-sm hover:shadow-md transition duration-200 scale-100 hover:scale-[100.5%]',
			},
			eventOpposite: {
				class: '-translate-y-1 w-full min-w-4 max-w-16 lg:max-w-40',
			},
		}">
			<template #opposite="{ item }: { item: INoteContent }">
				<small class="text-surface-500 w-full">{{ new Date("" + item.date).toDateString()
				}}</small>
			</template>
			<template #content="{ item }: { item: INoteContent }">
				<ListItemComponent :slug="item.slug + ''" :title="item.title" :description="item.description"
					:tags="item.tags"></ListItemComponent>
			</template>
		</Timeline>
	</div>
</template>
