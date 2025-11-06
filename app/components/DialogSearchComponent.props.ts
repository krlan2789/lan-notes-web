import type { EventBusType } from "~/utils/contracts/EventBus";

export interface DialogSearchComponentProps {
	onShow?: () => void;
	onHide?: () => void;
}

export class DialogSearchEventName {
	static OnShow: EventBusType = "show-dialog-search-event";
	static OnHide: EventBusType = "hide-dialog-search-event";
}
