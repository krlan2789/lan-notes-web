<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
import { DialogSearchEventName } from "./DialogSearchComponent.props";
import { useEventBus } from "~/composables/event-bus";

const { isDarkMode, toggleDarkMode } = useLayout();
const { eventBus } = useEventBus();

const title = appName;
const items = ref<MenuItem[]>([
	// {
	// 	label: "Notes",
	// 	route: "/all",
	// 	icon: 'pi pi-book',
	// },
	// {
	// 	label: 'More',
	// 	icon: 'pi pi-code',
	// 	items: [
	// 		{
	// 			label: 'Backend',
	// 			route: '/backend',
	// 		},
	// 		{
	// 			label: 'Frontend',
	// 			route: '/frontend',
	// 		},
	// 		{
	// 			label: 'Infrastructure',
	// 			route: '/infrastructure',
	// 		},
	// 	]
	// },
]);
</script>

<template>
	<div class="fixed w-full top-0 h-14 md:h-18 z-100 bg-surface-100">
		<Menubar :model="items" class="container rounded-none! bg-surface-100" breakpoint="560px" :pt="{
			itemContent: {
				class: [
					'cursor-pointer px-3 py-2 font-medium text-surface-700 transition duration-200 hover:text-primary-800 flex',
				],
			},
			item: {
				class: ['py-0 my-0'],
			},
			root: {
				class: ['py-2'],
			},
		}">
			<template #start>
				<NuxtLink to="/" class="block py-2 text-2xl sm:text-3xl font-semibold text-primary-500">
					<p class="flex flex-row items-center w-auto h-full gap-2 align-middle font-orbitron" translate="no">
						<span class="size-7">
							<svg class="size-full" viewBox="0 0 400.01 400.009" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<title>Logo LAN</title>
								<g id="Logo LAN">
									<g id="Logo">
										<path id="Shape"
											d="M59.0162 0L10 0C4.4764 0 0 4.4764 0 10L0 317.878C0 323.402 4.4764 327.878 10 327.878L317.878 327.878C323.401 327.878 327.878 323.402 327.878 317.878L327.878 268.862L69.0162 268.862C63.4926 268.862 59.0162 264.385 59.0162 258.862L59.0162 0Z"
											fill="currentColor" fill-rule="evenodd" transform="translate(0 72.131)" />
										<path id="Shape"
											d="M59.0163 0L10 0C4.47641 0 0 4.47641 0 10L3.05176e-05 317.878C3.05176e-05 323.401 4.47644 327.878 10 327.878L317.878 327.878C323.401 327.878 327.878 323.401 327.878 317.878L327.878 268.861L69.0163 268.861C63.4927 268.861 59.0163 264.385 59.0163 258.861L59.0163 0Z"
											fill="currentColor" fill-rule="evenodd"
											transform="matrix(-1 0 -0 -1 400.01 327.878)" />
										<path id="Rectangle"
											d="M229.704 0C234.123 0 237.704 3.58112 237.704 8L237.704 57.5738C237.704 61.9927 234.123 65.5738 229.704 65.5738L8 65.5738C3.58112 65.5738 0 61.9927 0 57.5738L0 8C0 3.58112 3.58112 0 8 0L229.704 0Z"
											fill="currentColor" transform="translate(81.967 167.213)" />
									</g>
								</g>
							</svg>
						</span>
						{{ title }}
					</p>
				</NuxtLink>
				<div class="spacer"></div>
				<Button @click="eventBus.$emit(DialogSearchEventName.OnShow)" variant="outlined"
					class="px-2 py-1.5 w-auto">
					<i class="pi pi-search text-xs"></i>
					Find
					<Chip icon="pi pi-microsoft" class="py-[0.5px] pl-0.5 pr-1 gap-px bg-primary-200">
						<template #default>
							<!-- <span class="pi pi-microsoft text-[10px]"></span> -->
							<kbd class="text-primary-500 font-semibold text-xs italic"> CTRL+K</kbd>
						</template>
					</Chip>
					<!-- <span class="pb-0.5">
					</span> -->
				</Button>
			</template>
			<template #item="{ item, hasSubmenu, props }">
				<NuxtLink :to="item.route" rel="noopener noreferrer" class="flex-1 grow">
					<span v-if="item.icon" :class="item.icon" class="mr-2"></span>
					<span>{{ item.label }}</span>
					<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2"></span>
				</NuxtLink>
			</template>
			<template #end>
				<button type="button"
					class="w-10 h-10 flex items-center cursor-pointer justify-center rounded-full hover:bg-surface-100 transition-all text-surface-900 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
					@click="toggleDarkMode">
					<i :class="['pi text-base', { 'pi-moon': isDarkMode, 'pi-sun': !isDarkMode }]"></i>
				</button>
			</template>
		</Menubar>
	</div>
</template>
