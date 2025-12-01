<script lang="ts" setup>
import { ListItemEventName, type IListItemData, type ListItemComponentProps } from "./ListItemComponent.props";

const { eventBus } = useEventBus();
const router = useRouter();

const props = defineProps<ListItemComponentProps>();

const isShortcutAvailable = typeof props.index === 'number' && props.index < 10;

const onClicked = () => {
	eventBus.$emit(ListItemEventName.OnItemClicked, {
		slug: props.slug,
		title: props.title,
		description: props.description,
		date: props.date,
		tags: props.tags,
	} as IListItemData);
	router.push(props.slug ? props.slug : '/');
};

const handleShortcut = (e: KeyboardEvent) => {
	if (isShortcutAvailable && e.ctrlKey && e.key.toLowerCase() === '' + props.index) {
		e.preventDefault();
		onClicked();
	}
};

onMounted(() => {
	if (props.onItemClicked) eventBus.$on(ListItemEventName.OnItemClicked, props.onItemClicked);
	if (isShortcutAvailable) window.addEventListener("keydown", handleShortcut);
});

onUnmounted(() => {
	if (props.onItemClicked) eventBus.$off(ListItemEventName.OnItemClicked, props.onItemClicked);
	if (isShortcutAvailable) window.removeEventListener("keydown", handleShortcut);
});
</script>

<template>
	<div :id="'card' + slug" @click="onClicked" link
		class="relative cursor-pointer p-4 bg-surface-100 shadow-sm hover:shadow-md transition duration-200 scale-100 hover:scale-[100.5%]">
		<div class="flex flex-row w-full px-2 mb-2 -mx-2">
			<div class="flex-1 grow">
				<h4 class="text-lg font-semibold text-primary w-full h-full" v-html="title"></h4>
			</div>

			<p v-if="date" class="text-[10px] text-surface-500 opacity-80 leading-loose lg:text-xs w-auto">
				{{ new Date(date).toDateString() }}
			</p>
		</div>
		<p class="text-sm text-surface-500 leading-tight line-clamp-1" v-html="description"></p>
		<div class="flex flex-row mt-4">
			<div v-if="tags" class="flex-1 grow flex flex-wrap gap-2">
				<Tag v-for="tag in tags" :key="tag" :value="'#' + tag" class="text-xs font-normal"
					:severity="severityOptions[tags.indexOf(tag) % severityOptions.length]"></Tag>
			</div>
			<p class="hidden md:block text-sm pl-1 pt-1 align-text-bottom">Read more</p>
		</div>
		<Badge v-if="isShortcutAvailable" :value="'CTRL+' + index" class="absolute -top-3 left-0 italic font-light">
		</Badge>
	</div>
</template>
