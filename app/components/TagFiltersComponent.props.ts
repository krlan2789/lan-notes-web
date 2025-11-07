import type { EventBusType } from "~/utils/contracts/EventBus";

export interface TagFiltersComponentProps {
	tags: any[];
	onSelected?: (tags: string[]) => void;
	onSearch?: (keyword: string) => void;
}

export class TagFiltersEventName {
	static OnTagSelected: EventBusType = 'tag-selected-event';
}
