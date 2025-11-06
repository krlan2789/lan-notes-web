<script setup lang="ts">
import type INoteContent from "~/utils/interfaces/INoteContent";
import type { ListComponentProps } from "./ListComponent.props";

const props = defineProps<ListComponentProps>();

const useLayout = ref(props.layout ?? "list");
</script>

<template>
	<div class="card">
		<DataView :value="items" :layout="useLayout" paginator :rows="8" alwaysShowPaginator class="bg-surface-0">
			<!-- <template #header>
				<div class="flex justify-end">
					<SelectButton v-model="layout" :options="options" :allowEmpty="false">
						<template #option="{ option }">
							<i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']"></i>
						</template>
</SelectButton>
</div>
</template> -->

			<template #list="{ items }: { items: INoteContent[] }">
				<div class="flex flex-col gap-10 mb-10">
					<ListItemComponent
						v-for="(item, index) in items"
						:key="index"
						class="rounded-lg p-4 bg-surface-100 flex-[4.7] grow-[4.7] shrink-[4.7] shadow-sm hover:shadow-md transition duration-200 scale-100 hover:scale-[100.5%]"
						:slug="item.slug ?? '' + item.slug"
						:title="item.title"
						:date="item.date"
						:description="item.description"
						:tags="item.tags"
					></ListItemComponent>
				</div>
			</template>

			<template #grid="{ items }: { items: INoteContent[] }">
				<div class="grid grid-cols-12 gap-4">
					<div v-for="(item, index) in items" :key="index" class="col-span-12 md:col-span-6 p-2">
						<ListItemComponent
							v-for="(item, index) in items"
							:key="index"
							class="rounded-lg p-4 bg-surface-100 flex-[4.7] grow-[4.7] shrink-[4.7] shadow-sm hover:shadow-md transition duration-200 scale-100 hover:scale-[100.5%]"
							:slug="item.slug ?? '' + item.slug"
							:title="item.title"
							:date="item.date"
							:description="item.description"
							:tags="item.tags"
						></ListItemComponent>
					</div>
				</div>
			</template>
			<template #empty>
				<div class="w-full h-32 flex justify-center text-center content-center align-middle text-xl">
					No notes found
				</div>
			</template>
			<template #paginatorcontainer="{ first, last, page, pageCount, prevPageCallback, nextPageCallback, totalRecords }">
				<div class="flex items-center gap-4 bg-surface-50 rounded-lg w-full py-1 px-2 justify-between">
					<Button
						icon="pi pi-chevron-left"
						rounded
						variant="text"
						@click="prevPageCallback"
						:disabled="page === 0"
					></Button>
					<div class="text-color font-medium">
						<span class="hidden sm:block">Showing {{ first }} to {{ last }} of {{ totalRecords }}</span>
						<span class="block sm:hidden">Page {{ page + 1 }} of {{ pageCount }}</span>
					</div>
					<Button
						icon="pi pi-chevron-right"
						rounded
						variant="text"
						@click="nextPageCallback"
						:disabled="page === (pageCount ?? 0) - 1"
					></Button>
				</div>
			</template>
			<!-- 
				<Paginator :rows="8" :totalRecords="items.length" :pt="{
					root: {
						class: 'bg-surface-0',
					},
					current: {
						class: 'bg-surface-0',
					},
					content: {
						class: 'bg-surface-0',
					},
					paginatorContainer: {
						class: 'bg-surface-0',
					},
				}">
					<template #container>
					</template>
				</Paginator>
			-->
		</DataView>
	</div>
</template>
