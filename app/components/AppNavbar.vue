<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
import EventBus, { EventBusEnum } from "~/shared/contracts/EventBus";

const items = ref<MenuItem[]>([
	{
		label: 'All Notes',
		route: '/',
	},
	{
		label: 'C# Programming',
		route: '/c-sharp',
	},
	{
		label: 'Unity Game Engine',
		route: '/unity',
	},
	{
		label: 'More',
		icon: 'pi pi-code',
		items: [
			{
				label: 'Backend',
				route: '/backend',
			},
			{
				label: 'Frontend',
				route: '/frontend',
			},
			{
				label: 'Infrastructure',
				route: '/infrastructure',
			},
		]
	},
]);
</script>

<template>
	<div class="fixed w-full top-0 z-100">
		<Menubar :model="items" class="w-full max-w-7xl mx-auto rounded-none!">
			<template #start>
				<a href="https://erlankurnia.laness.id"
					class="block py-2 text-2xl sm:text-3xl font-semibold text-primary">
					<p class="flex flex-row items-center w-auto h-full gap-2 align-middle text-primary" translate="no">
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
						LAN
					</p>
				</a>
				<div class="spacer"></div>
				<Button label="Find Note" icon="pi pi-search" @click="EventBus.$emit(EventBusEnum.ShowDialogSearch)"
					class="px-2 py-1.5"></Button>
			</template>
			<template #item="{ item, props, hasSubmenu }">
				<router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
					<a v-ripple :href="href" v-bind="props.action" @click="navigate">
						<span :class="item.icon"></span>
						<span>{{ item.label }}</span>
					</a>
				</router-link>
				<a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
					<span :class="item.icon"></span>
					<span>{{ item.label }}</span>
					<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down"></span>
				</a>
			</template>
		</Menubar>
	</div>
</template>
