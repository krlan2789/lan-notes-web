<script lang="ts" setup>
import { TagFiltersEventName, type TagFiltersComponentProps } from "./TagFiltersComponent.props";

const props = defineProps<TagFiltersComponentProps>();
const { eventBus } = useEventBus();

const availableTags = ref(new Set<string>(props.tags));
const selectedTags = ref(new Set<string>(props.initialSelectedTags ?? []));

const toggleFilter = (tag: string) => {
	selectedTags.value?.delete("");
	if (selectedTags.value?.has(tag)) selectedTags.value?.delete(tag);
	else selectedTags.value?.add(tag);
	eventBus.$emit(TagFiltersEventName.OnTagSelected, [...selectedTags.value]);
};

onMounted(() => {
	if (props.onSelected) eventBus.$on(TagFiltersEventName.OnTagSelected, props.onSelected);
});

onUnmounted(() => {
	if (props.onSelected) eventBus.$off(TagFiltersEventName.OnTagSelected, props.onSelected);
});
</script>

<template>
	<Panel toggleable :collapsed="!forceExapand" class="border-0 p-0 m-0" :pt="{
		header: {
			class: 'bg-surface-0 p-0 mx-0 mb-6 border-none shadow-none',
		},
		root: {
			class: 'bg-surface-0 p-0 m-0 border-none shadow-none',
		},
	}">
		<template #header>
			<SearchBarComponent class="w-full mr-2" @search="onSearch" />
		</template>
		<div class="flex flex-wrap gap-2 justify-center bg-surface-0 w-full text-center">
			<span v-for="(tag, index) of availableTags" :key="tag">
				<input type="checkbox" :id="'tag-' + tag + '-' + index" class="hidden peer" :value="tag"
					:checked="selectedTags?.has(tag)" @change="toggleFilter(tag)" />
				<label :for="'tag-' + tag + '-' + index"
					class="flex items-center justify-center text-xs py-[3px] px-2 font-medium select-none cursor-pointer border-[1.5px] border-surface-700 text-surface-700 transition-colors duration-200 ease-in-out peer-checked:bg-surface-700 peer-checked:text-surface-100">
					#{{ tag }}
				</label>
			</span>
		</div>
	</Panel>
</template>
