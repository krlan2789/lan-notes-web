import type { StorageValue } from "unstorage";

export const CacheServiceToken = "ICacheService";

export type CacheTypeValue = StorageValue;

export interface ICacheService {
	set<T extends CacheTypeValue>(key: string, value: T): Promise<void>;
	get<T extends CacheTypeValue>(key: string): Promise<T | null>;
	remove(key: string): Promise<void>;
	clear(): Promise<void>;
	keys(): Promise<string[]>;
	count(): Promise<number>;
	setOneBySlug<T extends CacheTypeValue>(item: T): Promise<void>;
	setManyBySlug<T extends CacheTypeValue>(items: T[]): Promise<void>;
	getOneBySlug<T extends CacheTypeValue>(slug: string): Promise<T | null>;
	getManyBySlug<T extends CacheTypeValue>(slugs: string[]): Promise<T[] | null>;
}
