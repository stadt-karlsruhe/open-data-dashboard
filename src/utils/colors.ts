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
export const colorGray = 'var(--bs-gray)';

const colors: string[] = [colorPrimary, colorYellow, colorPurple, colorTeal, colorCyan, colorOrange];

export function getColor(index: number) {
    return colors[index % colors.length];
}

export function getColorForResourceType(type?: 'JSON' | 'GeoJSON' | 'CSV' | 'PDF' | 'HTML') {
    switch (type) {
        case 'CSV': {
            return 'var(--type-color-csv)';
        }
        case 'JSON': {
            return 'var(--type-color-json)';
        }
        case 'GeoJSON': {
            return 'var(--type-color-geojson)';
        }
        case 'PDF': {
            return 'var(--type-color-pdf)';
        }
        case 'HTML': {
            return 'var(--type-color-html)';
        }
        default:
    }
}
