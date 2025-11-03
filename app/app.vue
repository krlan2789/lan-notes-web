<template>
	<AppNavbar />
	<div class="bg-surface-50 dark:bg-surface-950 min-h-screen p-8 flex flex-col gap-6">
		<div class="w-full h-6 sm:h-12"></div>
		<AppTopbar />
		<div class="flex flex-col w-full max-w-7xl mx-auto gap-6 flex-1">
			<DashboardStatsComponent />
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<DashboardSalesTrendComponent />
				<DashboardRecentActivityComponent />
			</div>
			<DashboardProductOverviewComponent />
		</div>
		<AppFooter />
		<DialogSearchComponent />
	</div>
</template>
