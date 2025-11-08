<script setup lang="ts">
import type INoteContent from "~/utils/interfaces/INoteContent";
import type { TimelineComponentProps } from "./TimelineComponent.props";

defineProps<TimelineComponentProps>();
</script>

<template>
	<section class="flex flex-col px-4 xl:px-0 mx-auto font-normal w-full">
		<div class="flex justify-center align-middle w-full py-12 bg-surface-0">
			<Divider align="center" type="solid" :pt="{
				root: {
					class: 'bg-surface-0',
				},
				content: {
					class: 'bg-surface-0',
				},
			}">
				<h2 class="text-2xl font-semibold text-primary">Latest {{ items.length < 25 ? items.length : 25 }}</h2>
			</Divider>
		</div>
		<Timeline :value="items" :pt="{
			root: {
				class: 'pb-12',
			},
			eventContent: {
				class: 'mb-8 ml-4 lg:mb-12 lg:ml-12 p-2 lg:p-4 bg-surface-100 7xl:flex-[4.7] 7xl:grow-[4.7] 7xl:shrink-[4.7] shadow-sm hover:shadow-md transition duration-200 scale-100 hover:scale-[100.5%]',
			},
			eventOpposite: {
				class: '-translate-y-1 w-full min-w-8 max-w-16 sm:min-w-20 sm:max-w-28 xl:min-w-32 xl:max-w-40',
			},
		}">
			<template #opposite="{ item }: { item: INoteContent }">
				<small class="text-surface-500 w-full">{{ new Date("" + item.date).toDateString()
				}}</small>
			</template>
			<template #content="{ item, index }: { item: INoteContent, index: number }">
				<ListItemComponent :slug="item.slug + ''" :index :title="item.title" :description="item.description"
					:tags="item.tags"></ListItemComponent>
			</template>
		</Timeline>
	</section>
</template>
