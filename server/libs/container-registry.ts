import { H3Event, EventHandlerRequest } from "h3";

type ContainerRegistryType<T> = { instance?: T; factory?: (event?: any) => T | undefined; lifetime: string };

class ContainerRegistry {
    private registry = new Map<string, ContainerRegistryType<any>>();

    registerSingleton<T>(token: string, instance: T) {
        this.registry.set(token, { instance: instance, lifetime: "singleton" });
    }

    registerScoped<T>(token: string, factory: (event?: any) => T) {
        this.registry.set(token, { factory, lifetime: "scoped" });
    }

    registerTransient<T>(token: string, factory: (event?: any) => T) {
        this.registry.set(token, { factory, lifetime: "transient" });
    }

    resolve<T>(token: string, event?: H3Event<EventHandlerRequest>): T | undefined {
        const entry = this.registry.get(token);
        let instance: any | undefined;
        // console.log(`ContainerRegistry.${token}.entry:`, entry);
        if (entry?.lifetime == "singleton") {
            instance = entry?.instance as T;
        } else if (entry?.lifetime == "transient") {
            instance = entry?.factory?.() as T;
        } else if (entry?.lifetime == "scoped" && event) {
            if (!event.context.di) {
                event.context.di = {};
            }
            if (!event.context.di[token]) {
                event.context.di[token] = entry?.factory?.(event);
            }
            instance = event.context.di[token] as T;
        } else {
            instance = undefined;
        }

        return instance;
    }
}

const instance = new ContainerRegistry();
export default instance;
