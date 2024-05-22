export function computeIfAbsent(map: Map<unknown, unknown>, key: unknown, defaultValue: unknown) {
    let value = map.get(key);
    if (value === undefined) {
        value = defaultValue;
        map.set(key, value);
    }
    return value;
}
