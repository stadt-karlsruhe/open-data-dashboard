export function sanitizeString(string: string) {
    return string
        .trim()
        .replaceAll(/\s+/gu, '-')
        .replaceAll(/["#$%&'()*+,./:<>?\\{}~]/gu, '');
}

export function safeStringCompare(paramString: string, configString: string) {
    return decodeURIComponent(paramString).toLowerCase() === sanitizeString(configString).toLowerCase();
}

export function concatenateNameAndId(name: string, id: string) {
    return `${sanitizeString(name).toLowerCase()}-${sanitizeString(id).toLowerCase()}`;
}
