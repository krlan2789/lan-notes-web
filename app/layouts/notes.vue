<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");
</script>

<template>
	<UContainer>
		<UPage id="markdown" class="max-w-7xl mx-auto mb-16 px-4">
			<template #left>
				<UPageAside>
					<UContentNavigation highlight :navigation="navigation" />
				</UPageAside>
			</template>

			<slot></slot>
		</UPage>
	</UContainer>
</template>
