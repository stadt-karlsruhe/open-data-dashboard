export function replaceWhitespaceInString(string: string) {
    return string.trim().replaceAll(/\s+/gu, '-');
}

export function safeStringCompare(paramString: string, configString: string) {
    return decodeURIComponent(paramString).toLowerCase() === replaceWhitespaceInString(configString).toLowerCase();
}
