import type { EventBusCallback, EventBusType } from "../interfaces/IEventBus";
import type IEventBus from "../interfaces/IEventBus";

export default class CustomEventBusService implements IEventBus {
	private listeners: Map<EventBusType, EventBusCallback[]>;

	constructor() {
		this.listeners = new Map();
	}

	$on(event: EventBusType, callback: EventBusCallback) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, []);
		}
		this.listeners.get(event)?.push(callback);
	}

	$emit(event: EventBusType, ...args: any[]) {
		if (this.listeners.has(event)) {
			this.listeners.get(event)?.forEach((callback) => callback(...args));
		}
	}

	$off(event: EventBusType, callback: EventBusCallback) {
		if (this.listeners.has(event)) {
			this.listeners.set(event, this.listeners.get(event)?.filter((cb) => cb !== callback) || []);
		}
	}
}
