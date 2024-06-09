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
export const colorLight = 'var(--bs-light)';

const colors: string[] = [colorPrimary, colorYellow, colorPurple, colorTeal, colorCyan, colorOrange];

export function getColor(index: number) {
    return colors[index % colors.length];
}

const colorForType: Map<string, string> = new Map<string, string>([
    ['JSON', 'var(--type-color-json)'],
    ['GeoJSON', 'var(--type-color-geojson)'],
    ['CSV', 'var(--type-color-csv)'],
    ['Embedded', 'var(--type-color-embedded)'],
]);

export function getColorForResourceType(type: 'JSON' | 'GeoJSON' | 'CSV' | 'Embedded' | undefined) {
    if (type === undefined) {
        return;
    }
    return colorForType.get(type);
}
