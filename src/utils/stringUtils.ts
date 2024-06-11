export function replaceWhitespaceInString(string: string) {
    return string.trim().replaceAll(/\s+/gu, '-');
}

export function saveStringCompare(paramString: string, configString: string) {
    return decodeURIComponent(paramString).toLowerCase() === replaceWhitespaceInString(configString).toLowerCase();
}
