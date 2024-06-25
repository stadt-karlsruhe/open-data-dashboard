import {
    Category,
    Configuration,
    Dashboard,
    DashboardContentSize,
    Resource,
} from '@/schemas/configuration/configurationSchema';
import { concatenateNameAndId, sanitizeString } from './stringUtils';

import { DataElement } from '@/types/data';
import { LRUCache } from 'lru-cache';
import { getIconForResource } from './icons';

export function computeIfAbsent<K, V>(map: Map<K, V>, key: K, defaultValueFn: () => V) {
    let value = map.get(key);
    if (value === undefined) {
        value = defaultValueFn();
        map.set(key, value);
    }
    return value;
}

export function computeIfUncached<V extends object>(
    cache: LRUCache<string, V>,
    key: string,
    defaultValueFn: () => V,
): V {
    let value = cache.get(key);
    if (value === undefined) {
        console.debug(`cache miss! key: ${String(key)}`);
        value = defaultValueFn();
        cache.set(key, value);
    } else {
        console.debug(`cache hit! key: ${String(key)}`);
    }
    return value;
}

export function configurationToDashboards(configuration: Configuration) {
    return configuration.dashboards
        .filter((dashboard) => dashboard.id !== 'homepage')
        .map((dashboard) => dashboardToDataElement(dashboard));
}

export function configurationToResources(configuration: Configuration, category?: Category) {
    return configuration.resources
        .filter((resource) => category === undefined || category.resources?.includes(resource.id.toLowerCase()))
        .map((resource) => resourceToDataElement(resource));
}

export function configurationToCategories(configuration: Configuration) {
    return configuration.categories.map((category) => categoryToDataElement(category));
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
        .map((subcategory) => categoryToDataElement(subcategory, subcategory.categoryName));
}

export function resourceToDataElement(resource: Resource) {
    return {
        id: `resource-${resource.id}`,
        name: resource.name,
        icon: getIconForResource(resource),
        description: resource.description,
        href: `/resource/${concatenateNameAndId(resource.name, resource.id)}`,
        type: 'resource',
        resourceType: resource.type,
    } as DataElement;
}

export function categoryToDataElement(category: Category, parentCategory?: string) {
    return {
        id: `subcategory-${category.name}`,
        name: category.name,
        icon: category.icon,
        description: category.description,
        href: parentCategory
            ? `/overview/resources/${sanitizeString(parentCategory).toLowerCase()}/${sanitizeString(category.name).toLowerCase()}`
            : `/overview/resources/${sanitizeString(category.name).toLowerCase()}`,
        type: 'category',
    } as DataElement;
}

export function dashboardToDataElement(dashboard: Dashboard) {
    return {
        id: `dashboard-${dashboard.id}`,
        name: dashboard.name,
        icon: dashboard.icon,
        description: dashboard.description,
        href: `/dashboard/${concatenateNameAndId(dashboard.name, dashboard.id)}`,
        type: 'dashboard',
    } as DataElement;
}

export function sizeClassToHeight(size: DashboardContentSize) {
    switch (size) {
        case 'L': {
            return 1000;
        }
        case 'M': {
            return 500;
        }
        case 'S': {
            return 250;
        }
        case 'XS': {
            return 125;
        }
        default: {
            return 500;
        }
    }
}
