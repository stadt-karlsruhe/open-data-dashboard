// https://getbootstrap.com/docs/5.2/customize/css-variables/
export const colorPrimary = 'var(--bs-primary)';
export const colorSecondary = 'var(--bs-secondary)';
export const colorYellow = 'var(--bs-yellow)';
export const colorPurple = 'var(--bs-purple)';
export const colorTeal = 'var(--bs-teal)';
export const colorCyan = 'var(--bs-orange)';
export const colorOrange = 'var(--bs-cyan)';
export const colorRed = 'var(--bs-red)';
export const colorDark = 'var(--bs-dark)';

const colors: string[] = [colorPrimary, colorYellow, colorPurple, colorTeal, colorCyan, colorOrange];

export function getColor(index: number) {
    return colors[index % colors.length];
}
