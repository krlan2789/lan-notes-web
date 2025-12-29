<template>
	<footer class="container border-t border-primary-400">
		<div class="w-full px-6 xl:px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- Branding -->
			<div>
				<h2 class="text-xl font-semibold mb-4">Erlan Kurnia's Note</h2>
				<p class="text-sm text-surface-600">
					{{ appTagline }}
				</p>
			</div>
			<!-- Branding -->

			<!-- Navigation -->
			<div>
				<h3 class="text-md font-semibold mb-4">Explore</h3>
				<ul class="space-y-1 text-sm font-medium text-surface-700">
					<li>
						<a href="https://erlankurnia.laness.id/who_iam" target="_blank" rel="noopener noreferrer"
							class="p-ripple transition duration-200 hover:text-primary-800">Who I'm</a>
					</li>
					<li>
						<a href="https://erlankurnia.laness.id/#contact" target="_blank" rel="noopener noreferrer"
							class="p-ripple transition duration-200 hover:text-primary-800">Contact Me</a>
					</li>
					<li>
						<NuxtLink to="/references" rel="noopener noreferrer"
							class="p-ripple transition duration-200 hover:text-primary-800">
							References</NuxtLink>
					</li>
				</ul>
			</div>
			<!-- Navigation -->

			<!-- Social & Newsletter -->
			<div>
				<h3 class="text-md font-semibold mb-4">Stay Connected</h3>
				<div class="flex space-x-4 mb-4">
					<a href="https://github.com/krlan2789" target="_blank">
						<Button icon="pi pi-github" size="small" severity="primary" aria-label="GitHub"></Button>
					</a>
					<a href="https://web.facebook.com/krlan2789" target="_blank">
						<Button icon="pi pi-facebook" size="small" severity="primary" aria-label="Facebook"></Button>
					</a>
					<a href="https://www.instagram.com/krlan2789" target="_blank">
						<Button icon="pi pi-instagram" size="small" severity="primary" aria-label="Instagram"></Button>
					</a>
					<a href="https://www.linkedin.com/in/krlan2789" target="_blank">
						<Button icon="pi pi-linkedin" size="small" severity="primary" aria-label="Linkedin"></Button>
					</a>
				</div>
				<!-- <InputGroup>
					<InputText placeholder="Your email" class="bg-surface-100 text-surface-700" />
					<Button label="Subscribe" icon="pi pi-envelope" severity="primary"></Button>
				</InputGroup> -->
			</div>
			<!-- Social & Newsletter -->
		</div>

		<!-- Copyright -->
		<div
			class="flex flex-row gap-1.5 justify-center align-middle text-center text-xs md:text-sm py-4 border-t border-primary-400">
			<span class="flex justify-center align-middle items-center">
				<span class="w-4 h-auto aspect-square">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 22c5.421 0 10-4.579 10-10S17.421 2 12 2 2 6.579 2 12s4.579 10 10 10zm0-18c4.337 0 8 3.663 8 8s-3.663 8-8 8-8-3.663-8-8 3.663-8 8-8z">
						</path>
						<path
							d="M12 17c.901 0 2.581-.168 3.707-1.292l-1.414-1.416C13.85 14.735 12.992 15 12 15c-1.626 0-3-1.374-3-3s1.374-3 3-3c.993 0 1.851.265 2.293.707l1.414-1.414C14.582 7.168 12.901 7 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5z">
						</path>
					</svg>
				</span>
				2025
			</span>
			<span class="size-1 bg-surface-400 my-auto"></span>
			<span>Developed and built by
				<a class="font-bold text-primary" target="_blank"
					href="https://erlankurnia.laness.id">krlan2789</a></span>
		</div>
		<!-- Copyright -->
	</footer>
</template>
