import { Category, Configuration } from '@/schemas/configurationSchema';
import { concatenateNameAndId, replaceWhitespaceInString } from './stringUtils';

import { DataElement } from '@/types/data';
import { LRUCache } from 'lru-cache';
import { getIconForResource } from './icons';

export function computeIfAbsent(map: Map<unknown, unknown>, key: unknown, defaultValueFn: () => unknown) {
    let value = map.get(key);
    if (value === undefined) {
        value = defaultValueFn();
        map.set(key, value);
    }
    return value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function computeIfUncached(cache: LRUCache<any, any>, key: unknown, defaultValueFn: () => unknown) {
    let value = cache.get(key) as unknown;
    if (value === undefined) {
        console.debug(`cache miss! key: ${key as string}`);
        value = defaultValueFn();
        cache.set(key, value);
    } else {
        console.debug('cache hit!');
    }
    return value;
}

export function configurationToDashboards(configuration: Configuration) {
    return configuration.dashboards
        .filter((dashboard) => dashboard.id !== 'homepage')
        .map((dashboard) => ({
            id: `dashboard-${dashboard.id}`,
            name: dashboard.name,
            icon: dashboard.icon,
            description: dashboard.description,
            href: `/dashboard/${concatenateNameAndId(dashboard.name, dashboard.id)}`,
            type: 'dashboard',
        })) as DataElement[];
}

export function configurationToResources(configuration: Configuration, category?: Category) {
    return configuration.resources
        .filter((resource) => category === undefined || category.resources?.includes(resource.id.toLowerCase()))
        .map((resource) => ({
            id: `resource-${resource.id}`,
            name: resource.name,
            icon: getIconForResource(resource),
            description: resource.description,
            href: `/resource/${concatenateNameAndId(resource.name, resource.id)}`,
            type: 'resource',
            resourceType: resource.type,
        })) as DataElement[];
}

export function configurationToCategories(configuration: Configuration) {
    return configuration.categories.map((category) => ({
        id: `category-${category.name}`,
        name: category.name,
        icon: category.icon,
        description: category.description,
        href: `/overview/resources/${replaceWhitespaceInString(category.name).toLowerCase()}`,
        type: 'category',
    })) as DataElement[];
}

export function configurationToSubcategories(configuration: Configuration, category?: Category) {
    return configuration.categories
        .filter((cat) => category === undefined || cat.name === category.name)
        .flatMap((cat) =>
            (cat.subcategories ?? []).map((subcategory) => ({
                ...subcategory,
                categoryName: cat.name,
            })),
        )
        .map((subcategory) => ({
            id: `subcategory-${subcategory.name}`,
            name: subcategory.name,
            icon: subcategory.icon,
            description: subcategory.description,
            href: `/overview/resources/${replaceWhitespaceInString(subcategory.categoryName).toLowerCase()}/${replaceWhitespaceInString(subcategory.name).toLowerCase()}`,
            type: 'category',
        })) as DataElement[];
}
