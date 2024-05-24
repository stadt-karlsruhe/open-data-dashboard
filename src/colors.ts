// TODO: We need better and more colors. Also might become obsolete if we decide to make colors configurable
const colors: string[] = ['var(--primary)', '#1ab015', '#dce320', '#e39820'];

export function generateRandomColor() {
    // eslint-disable-next-line unicorn/numeric-separators-style
    return `#${(0x1000000 + Math.random() * 0xffffff).toString(16).slice(1, 7)}`;
}

export function getColor(index: number) {
    if (index >= colors.length) {
        return generateRandomColor();
    }
    return colors[index];
}
