<script lang="ts" setup>
import { useEventBus } from "~/composables/event-bus";
import { DialogSearchEventName, type DialogSearchComponentProps } from "./DialogSearchComponent.props";
import type INoteContent from "~/utils/interfaces/INoteContent";

const props = defineProps<DialogSearchComponentProps>();

const visible = ref(false);
const searchKeyword = ref('');
const filteredNotes = ref<INoteContent[]>([]);
const { eventBus } = useEventBus();

watch(searchKeyword, async (keyword) => {
	if (keyword?.length > 0) {
		const res = await loadAllNotes({ path: 'live-search', latestFirst: true, keyword });
		// console.log(keyword);
		// console.log(res);
		filteredNotes.value = res ?? [];
	} else {
		filteredNotes.value = [];
	}

});

let timer = 0;
const onFindByKeyword = (keyword: string) => {
	// console.log(keyword);
	if (timer > 0) clearTimeout(timer);
	timer = setTimeout(() => {
		searchKeyword.value = keyword.toLowerCase();
	}, 500);
};

const showDialog = () => {
	visible.value = true;
	searchKeyword.value = '';
	if (props.onShow) props.onShow();
};

const hideDialog = () => {
	visible.value = false;
	searchKeyword.value = '';
	if (props.onHide) props.onHide();
};

const handleShortcut = (e: KeyboardEvent) => {
	if (!visible.value && e.ctrlKey && e.key.toLowerCase() === "k") {
		e.preventDefault();
		showDialog();
	}
};

onMounted(async () => {
	eventBus.$on(DialogSearchEventName.OnShow, showDialog);
	eventBus.$on(DialogSearchEventName.OnHide, hideDialog);
	window.addEventListener("keydown", handleShortcut);
});
onUnmounted(() => {
	eventBus.$off(DialogSearchEventName.OnShow, showDialog);
	eventBus.$off(DialogSearchEventName.OnHide, hideDialog);
	window.removeEventListener("keydown", handleShortcut);
});
</script>

<template>
	<Dialog v-model:visible="visible" modal :style="{ width: '50rem' }" class="bg-surface-0 origin-top h-[92vh]"
		dismissable-mask close-on-escape block-scroll :draggable="false"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
		<template #header>
			<SearchBarComponent class="w-full mr-2" @search="onFindByKeyword" autofocus />
		</template>
		<template #closeicon>
			<kbd class="text-primary-500 font-semibold italic">ESC</kbd>
		</template>
		<template #default>
			<ListComponent layout="list" :items="filteredNotes"></ListComponent>
		</template>
	</Dialog>
</template>
