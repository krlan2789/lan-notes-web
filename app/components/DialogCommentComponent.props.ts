import type { EventBusType } from "~/utils/contracts/EventBus";

export interface DialogCommentComponentProps {
    onShow?: () => void;
    onHide?: () => void;
}

export class DialogCommentEventName {
    static OnShow: EventBusType = 'show-dialog-comment-event';
    static OnHide: EventBusType = 'hide-dialog-comment-event';
}
