import type { EventBusType } from "~/utils/services/CustomEventBusService";

export interface TagFiltersComponentProps {
	tags: string[];
	initialSelectedTags?: Set<string>;
	forceExapand?: boolean;
	onSelected?: (tags: string[]) => void;
	onSearch?: (keyword: string) => void;
}

export class TagFiltersEventName {
	static OnTagSelected: EventBusType = "tag-selected-event";
}
