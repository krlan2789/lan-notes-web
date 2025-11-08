import type { EventBusType } from "~/utils/contracts/EventBus";

export interface IListItemData {
	slug: string;
	title: string;
	description?: string;
	tags?: string[];
	date?: string;
}

export interface ListItemComponentProps extends IListItemData {
	index?: number;
	onItemClicked?: (keyword: IListItemData) => void;
}

export class ListItemEventName {
	static OnItemClicked: EventBusType = 'item-clicked-event';
}
