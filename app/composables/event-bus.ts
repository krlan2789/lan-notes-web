import type IEventBus from "~/utils/contracts/IEventBus";
import CustomEventBusService from "~/utils/services/CustomEventBusService";

type EventBusType = { eventBus: IEventBus };
const eventBus = new CustomEventBusService();

export function useEventBus(): EventBusType {
	return {
		eventBus,
	};
}
