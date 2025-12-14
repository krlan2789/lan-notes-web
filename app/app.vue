<script setup lang="ts">
const { initialize, enableAnalytics } = useGtag();

// Initialize Google Tag Manager
initialize();
// Enable Google Analytics
enableAnalytics();
</script>

<template>
	<AppNavbar />
	<div class="bg-surface-0 min-h-screen flex flex-col w-full">
		<div class="w-full">
			<NuxtPage />
			<AppFooter />
		</div>
		<DialogSearchComponent />
	</div>
</template>
