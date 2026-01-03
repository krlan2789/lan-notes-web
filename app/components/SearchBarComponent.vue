<script lang="ts" setup>
import { SearchBarEventName, type SearchBarComponentProps } from "./SearchBarComponent.props";

const props = defineProps<SearchBarComponentProps>();
const { eventBus } = useEventBus();

const keyword = ref(props.defaultKeyword ?? "");

onMounted(() => {
	if (props.onSearch) eventBus.$on(SearchBarEventName.OnSearchByKeyword, props.onSearch);
});

onUnmounted(() => {
	if (props.onSearch) eventBus.$off(SearchBarEventName.OnSearchByKeyword, props.onSearch);
});
</script>

<template>
	<InputGroup>
		<InputGroupAddon class="bg-surface-0">
			<i class="pi pi-search"></i>
		</InputGroupAddon>
		<InputText
			@input="() => props.onSearch?.(keyword)"
			v-model="keyword"
			placeholder="Find notes"
			:value="keyword"
			class="bg-surface-100 text-surface-700"
			fluid
			:autofocus="autofocus"
		></InputText>
		<!-- <InputGroupAddon>
			<Button icon="pi pi-times" severity="secondary" @click="keyword = ''"></Button>
		</InputGroupAddon> -->
	</InputGroup>
</template>
