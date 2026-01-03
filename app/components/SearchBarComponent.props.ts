import type { EventBusType } from "~/utils/services/CustomEventBusService";

export interface SearchBarComponentProps {
	defaultKeyword?: string;
	autofocus?: boolean;
	onSearch?: (keyword: string) => void;
}

export class SearchBarEventName {
	static OnSearchByKeyword: EventBusType = "search-by-keyword-event";
}
