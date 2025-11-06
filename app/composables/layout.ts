import { computed, ref } from "vue";

interface IAppState {
	primary: string | null;
	surface: string | null;
	darkMode: boolean;
}

const appState = ref<IAppState>({
	primary: "violet",
	surface: null,
	darkMode: false,
});

const darkModeClass = "my-app-dark";

export function useLayout() {
	function setDarkMode(value: boolean) {
		appState.value.darkMode = value;
		localStorage.setItem(darkModeClass, value ? "on" : "");
		if (value) {
			document.documentElement.classList.add(darkModeClass);
		} else {
			document.documentElement.classList.remove(darkModeClass);
		}
	}

	function toggleDarkMode() {
		appState.value.darkMode = !appState.value.darkMode;
		localStorage.setItem(darkModeClass, appState.value.darkMode ? "on" : "");
		document.documentElement.classList.toggle(darkModeClass);
	}

	if (localStorage.getItem(darkModeClass) == "on") setDarkMode(true);

	const isDarkMode = computed(() => appState.value.darkMode);
	const primary = computed(() => appState.value.primary);
	const surface = computed(() => appState.value.surface);

	return {
		isDarkMode,
		primary,
		surface,
		toggleDarkMode,
		setDarkMode,
	};
}
