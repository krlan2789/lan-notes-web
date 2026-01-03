<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
	error: Object as () => NuxtError,
});
</script>

<template>
	<section class="h-screen w-screen flex flex-col gap-12 justify-center items-center bg-surface-0">
		<div class="flex flex-col gap-8 justify-center items-center">
			<Message
				severity="secondary"
				variant="simple"
				:pt="{
					text: {
						class: 'font-orbitron text-6xl md:text-7xl xl:text-8xl',
					},
				}"
				>Error {{ error?.statusCode }}</Message
			>
			<p class="text-2xl md:text-3xl xl:text-4xl text-center text-neutral-500">Page not found</p>
		</div>
		<div class="flex flex-row gap-4">
			<NuxtLink to="/">
				<Button severity="secondary" class="w-32 md:w-36 xl:w-40 text-xs md:text-sm xl:text-base">
					Go back home
				</Button>
			</NuxtLink>
			<NuxtLink to="/all">
				<Button outlined severity="secondary" class="w-32 md:w-36 xl:w-40 text-xs md:text-sm xl:text-base">
					See all notes
				</Button>
			</NuxtLink>
		</div>
	</section>
</template>
