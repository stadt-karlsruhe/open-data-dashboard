// https://getbootstrap.com/docs/5.2/customize/css-variables/
// TODO: Might become obsolete if we decide to make colors configurable
// TODO: Add 3-4 more colors
const colors: string[] = [
    'var(--bs-primary)',
    'var(--bs-yellow)',
    'var(--bs-gray)',
    'var(--bs-purple)',
    'var(--bs-teal)',
    'var(--bs-cyan)',
    'var(--bs-orange)',
];

export function getColor(index: number) {
    return colors[index % colors.length];
}
