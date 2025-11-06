<script lang="ts" setup></script>

<template>
	<AppTopbar class="my-6" />
	<div class="flex flex-col w-full max-w-7xl mx-auto gap-6 flex-1">
		<DashboardStatsComponent />
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<DashboardSalesTrendComponent />
			<DashboardRecentActivityComponent />
		</div>
		<DashboardProductOverviewComponent />
	</div>
</template>
