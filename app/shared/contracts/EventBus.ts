export enum EventBusEnum {
	ShowDialogSearch = "show-dialog-search",
	HideDialogSearch = "hide-dialog-search",
}

export type EventBusCallback = (...args: any[]) => void;

class EventBus {
	private bus: Map<EventBusEnum, EventBusCallback[]>;

	constructor() {
		this.bus = new Map();
	}

	$on(event: EventBusEnum, callback: EventBusCallback) {
		if (!this.bus.has(event)) {
			this.bus.set(event, []);
		}
		this.bus.get(event)?.push(callback);
	}

	$emit(event: EventBusEnum, ...args: any[]) {
		if (this.bus.has(event)) {
			this.bus.get(event)?.forEach(callback => callback(...args));
		}
	}

	$off(event: EventBusEnum, callback: EventBusCallback) {
		if (this.bus.has(event)) {
			this.bus.set(
				event,
				this.bus.get(event)?.filter(cb => cb !== callback) || []
			);
		}
	}
}

export default new EventBus();
// const eventBus = new EventBus();
// export default eventBus;
