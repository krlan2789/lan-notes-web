import type { EventBusType } from "~/utils/contracts/EventBus";

export interface SearchBarComponentProps {
	// categories?: SelectOption[];
	// onCaterogrySelected?: (selected: SelectOption) => void;
	defaultKeyword?: string;
	onSearch?: (keyword: string) => void;
}

// export interface SelectOption {
// 	name: string;
// 	code?: string;
// }

export class SearchBarEventName {
	static OnSearch: EventBusType;
	// static OnCategorySelected: EventBusType;
}
