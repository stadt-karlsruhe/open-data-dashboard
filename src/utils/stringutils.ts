export function replaceWhitespaceInString(string: string) {
    return string.trim().replaceAll(/\s+/gu, '-');
}
