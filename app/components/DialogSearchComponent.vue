<script lang="ts" setup>
import { useEventBus } from "~/composables/event-bus";
import { DialogSearchEventName, type DialogSearchComponentProps } from "./DialogSearchComponent.props";

const props = defineProps<DialogSearchComponentProps>();

const visible = ref(false);
const { eventBus } = useEventBus();

const showDialog = () => {
	visible.value = true;
	if (props.onShow) props.onShow();
};

const hideDialog = () => {
	visible.value = false;
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
	<Dialog
		v-model:visible="visible"
		modal
		:style="{ width: '50rem' }"
		class="bg-surface-0 origin-top h-[92vh]"
		dismissable-mask
		close-on-escape
		block-scroll
		:draggable="false"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<template #header>
			<SearchBarComponent class="w-full mr-2" />
		</template>
		<template #closeicon>
			<!-- <i class="pi pi-arrow-down-left-and-arrow-up-right-to-center relative"></i> -->
			<kbd class="text-primary-500 font-semibold italic">ESC</kbd>
		</template>
		<slot name="result"></slot>
	</Dialog>
</template>
