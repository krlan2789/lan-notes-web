export type EventBusType = string;
export type EventBusCallback = (...args: any[]) => void;

export default interface IEventBus {
	$on(event: EventBusType, callback: EventBusCallback): void;
	$emit(event: EventBusType, ...args: any[]): void;
	$off(event: EventBusType, callback: EventBusCallback): void;
}
