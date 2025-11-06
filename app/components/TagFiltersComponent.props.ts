import type { EventBusType } from "~/utils/contracts/EventBus";

export interface TagFiltersComponentProps {
	tags: any[];
	onSelected?: (tags: string[]) => void;
}

export class TagFiltersEventName {
	static OnSelected: EventBusType;
}
