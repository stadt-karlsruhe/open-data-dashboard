// https://getbootstrap.com/docs/5.2/customize/css-variables/
const colors: string[] = [
    'var(--bs-primary)',
    'var(--bs-yellow)',
    'var(--bs-purple)',
    'var(--bs-teal)',
    'var(--bs-cyan)',
    'var(--bs-orange)',
];

export function getColor(index: number) {
    return colors[index % colors.length];
}
