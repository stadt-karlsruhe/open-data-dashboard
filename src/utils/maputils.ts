export function computeIfAbsent(map: Map<unknown, unknown>, key: unknown, defaultValueFn: () => unknown) {
    let value = map.get(key);
    if (value === undefined) {
        console.log('Cache miss!');
        value = defaultValueFn();
        map.set(key, value);
    }
    return value;
}
