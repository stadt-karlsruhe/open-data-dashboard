export function replaceWhitespaceInString(string: string) {
    return string.trim().replaceAll(/\s+/gu, '-');
}

export function safeStringCompare(paramString: string, configString: string) {
    return decodeURIComponent(paramString).toLowerCase() === replaceWhitespaceInString(configString).toLowerCase();
}

export function concatenateNameAndId(name: string, id: string) {
    return `${replaceWhitespaceInString(name).toLowerCase()}-${replaceWhitespaceInString(id).toLowerCase()}`;
}
