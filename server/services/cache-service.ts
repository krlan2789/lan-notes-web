import { H3Event, EventHandlerRequest } from "h3";
import { ICacheService, CacheTypeValue } from "~~/server/libs/contracts/ICacheService";

export class CacheService implements ICacheService {
    private storage = useStorage("cache");
    private storageOption = { ttl: 15/*60 * 60 * 24*/ };
    private prefix = "note-cache-";

    constructor(event: H3Event<EventHandlerRequest>) { }

    async set<T extends CacheTypeValue>(key: string, value: T): Promise<void> {
        await this.storage.setItem<T>(key, value, this.storageOption);
        // console.log(`${key} added in cache with value:`, value);
    }

    async get<T extends CacheTypeValue>(key: string): Promise<T | null> {
        // console.log(`Get ${key} in cache with value:`);
        return await this.storage.getItem<T>(key, { defaultValue: null });
    }

    async remove(key: string): Promise<void> {
        await this.storage.removeItem(key);
    }

    async clear(): Promise<void> {
        await this.storage.clear();
    }

    async keys() {
        return await this.storage.getKeys();
    }

    async count() {
        return (await this.keys()).length;
    }

    async setOneBySlug<T extends CacheTypeValue>(item: T): Promise<void> {
        const note = item;
        if (!("slug" in (note as any))) return;
        const key = this.prefix + (note as any).slug;
        await this.set<T>(key, note);
    }

    async setManyBySlug<T extends CacheTypeValue>(items: T[]): Promise<void> {
        for (let i = 0; i < items.length; i++) {
            const note = items[i];
            if (!("slug" in (note as any))) continue;
            const key = this.prefix + (note as any).slug;
            await this.set<T>(key, note);
        }
    }

    async getOneBySlug<T extends CacheTypeValue>(slug: string): Promise<T | null> {
        const key = this.prefix + slug;
        return await this.get<T>(key);
    }

    async getManyBySlug<T extends CacheTypeValue>(slugs: string[]): Promise<T[] | null> {
        const results: T[] = [];
        for (let i = 0; i < slugs.length; i++) {
            const slug = this.prefix + slugs[i];
            const item = await this.getOneBySlug<T>(slug);
            if (item) results.push(item);
        }
        return results.length > 0 ? results : null;
    }
}
