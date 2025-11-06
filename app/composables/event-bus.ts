import EventBus from "~/utils/contracts/EventBus";

const eventBus = new EventBus();

export function useEventBus() {
	return {
		eventBus,
	};
}
