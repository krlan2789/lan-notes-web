<template>
	<footer class="border-t border-primary-400">
		<div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- Branding -->
			<div>
				<h2 class="text-xl font-semibold mb-4">Erlan Kurnia's Notes</h2>
				<p class="text-sm text-surface-600">
					{{ appTagline }}
				</p>
				<!--  This site serves as a searchable archive of techniques, fixes, and onboarding-friendly documentation for future reference -->
			</div>
			<!-- Branding -->

			<!-- Navigation -->
			<div>
				<h3 class="text-md font-semibold mb-4">Explore</h3>
				<ul class="space-y-1 text-sm font-medium text-surface-700">
					<li>
						<a
							href="https://erlankurnia.laness.id/who_iam"
							target="_blank"
							rel="noopener noreferrer"
							class="p-ripple transition duration-200 hover:text-primary-800"
							>Who I'm</a
						>
					</li>
					<li>
						<a
							href="https://erlankurnia.laness.id/#contact"
							target="_blank"
							rel="noopener noreferrer"
							class="p-ripple transition duration-200 hover:text-primary-800"
							>Contact Me</a
						>
					</li>
					<li>
						<NuxtLink
							to="/references"
							rel="noopener noreferrer"
							class="p-ripple transition duration-200 hover:text-primary-800"
						>
							References</NuxtLink
						>
					</li>
				</ul>
			</div>
			<!-- Navigation -->

			<!-- Social & Newsletter -->
			<div>
				<h3 class="text-md font-semibold mb-4">Stay Connected</h3>
				<div class="flex space-x-4 mb-4">
					<Button icon="pi pi-facebook" size="small" severity="secondary" rounded aria-label="Facebook"></Button>
					<Button icon="pi pi-linkedin" size="small" severity="secondary" rounded aria-label="Linkedin"></Button>
					<Button icon="pi pi-instagram" size="small" severity="secondary" rounded aria-label="Instagram"></Button>
				</div>
				<InputGroup>
					<InputText placeholder="Your email" class="bg-surface-100 text-surface-700" />
					<Button label="Subscribe" icon="pi pi-envelope" severity="secondary"></Button>
				</InputGroup>
			</div>
			<!-- Social & Newsletter -->
		</div>

		<div
			class="flex flex-row gap-1.5 justify-center align-middle text-center text-xs md:text-sm py-4 border-t border-primary-400"
		>
			<span>&copy; 2025</span>
			<span class="size-1 rounded-full bg-surface-400 my-auto"></span>
			<span
				>Developed and built by
				<a class="font-bold text-primary" target="_blank" href="https://erlankurnia.laness.id">krlan2789</a></span
			>
		</div>
	</footer>
</template>
