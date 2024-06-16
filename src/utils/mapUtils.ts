import { LRUCache } from 'lru-cache';

export function computeIfAbsent(map: Map<unknown, unknown>, key: unknown, defaultValueFn: () => unknown) {
    let value = map.get(key);
    if (value === undefined) {
        value = defaultValueFn();
        map.set(key, value);
    }
    return value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function computeIfAbsentCache(cache: LRUCache<any, any>, key: unknown, defaultValueFn: () => unknown) {
    let value = cache.get(key) as unknown;
    if (value === undefined) {
        console.debug(`cache miss! key: ${key as string}`);
        value = defaultValueFn();
        cache.set(key, value);
    } else {
        console.debug('cache hit!');
    }
    return value;
}
