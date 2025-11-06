<template>
	<AppNavbar />
	<div class="bg-surface-0 min-h-screen flex flex-col w-full">
		<div class="h-20 sm:h-26 min-w-full"></div>
		<div class="max-w-7xl w-full mx-auto px-6 xl:px-0">
			<NuxtPage />
			<AppFooter />
		</div>
		<DialogSearchComponent />
	</div>
</template>
