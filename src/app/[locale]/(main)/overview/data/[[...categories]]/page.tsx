import {
  Category,
  Configuration,
  EmbeddedResource,
  GeoJSONResource,
  JSONResource,
  configurationSchema,
} from '@/schemas/configuration-schema';
import Overview, { OverviewRow } from '@/components/overview/Overview';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { computeIfAbsent } from '@/utils/maputils';
import { getConfiguration } from '@/configuration';
import { getIconForResource } from '@/icons';
import { getTranslations } from 'next-intl/server';
import { replaceWhitespaceInString } from '@/utils/stringutils';

const paramsToHeader: Map<string[], { title: string; description?: string }> = new Map<
  string[],
  { title: string; description?: string }
>();

interface CategoryPair {
  category?: string;
  subcategory?: string;
}

export default async function Page({ params }: { params: { categories?: string[] } }) {
  const configuration = await getConfiguration();
  const t = await getTranslations('Overview');
  if (!configuration.success || configuration.data?.resources === undefined) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }
  const parsedConfiguration = configurationSchema.safeParse(configuration.data);
  if (!parsedConfiguration.success) {
    return <ErrorComponent type="configurationInvalid" error={JSON.stringify(parsedConfiguration.error)} />;
  }
  let categoryPair: CategoryPair = {};
  if (params.categories !== undefined) {
    if (params.categories.length > 2) {
      return <ErrorComponent type="notFound" />;
    }
    categoryPair = parseParams(params.categories);
  }

  const header = getHeader(categoryPair, parsedConfiguration.data.categories) ?? {
    title: t('dataTitle'),
    description: t('dataDescription'),
  };
  return <Overview content={getContent(parsedConfiguration.data, categoryPair)} header={header} />;
}

function parseParams(categories: string[]) {
  const [category] = categories;
  const subcategory = categories.length > 1 ? categories[0] : undefined;
  return {
    category,
    subcategory,
  } as CategoryPair;
}

function getHeader(categoryPair: { category?: string; subcategory?: string }, configCategories: Category[]) {
  if (categoryPair.category !== undefined) {
    const header = computeIfAbsent(
      paramsToHeader,
      categoryPair,
      computeHeader(configCategories, categoryPair.category, categoryPair.subcategory),
    );
    if (header !== undefined) {
      return header as {
        title: string;
        description: string;
      };
    }
  }
}

function computeHeader(configCategories: Category[], category: string, subcategory?: string) {
  for (const configCategory of configCategories) {
    if (decodeURIComponent(category) === replaceWhitespaceInString(configCategory.name)) {
      if (subcategory === undefined) {
        return {
          title: configCategory.name,
          description: configCategory.description,
        };
      }
      if (configCategory.subCategories === undefined) {
        return;
      }
      for (const configSubcategory of configCategory.subCategories) {
        if (decodeURIComponent(subcategory) === replaceWhitespaceInString(configSubcategory.name)) {
          return {
            title: configSubcategory.name,
            description: configSubcategory.description,
          };
        }
      }
    }
  }
}

function getContent(configuration: Configuration, categoryPair: { category?: string; subcategory?: string }) {
  const content: OverviewRow[] = [];
  addCategoriesToContent(content, configuration, categoryPair);
  addDatasetsToContent(content, configuration.resources, categoryPair);
  return content;
}

// TODO: make this function nicer and more compact
function addCategoriesToContent(
  content: OverviewRow[],
  configuration: Configuration,
  categoryPair: { category?: string; subcategory?: string },
) {
  if (categoryPair.category === undefined) {
    for (const category of configuration.categories) {
      content.push({
        title: category.name,
        description: category.description,
        href: `/overview/data/${replaceWhitespaceInString(category.name)}`,
        isCategory: true,
        icon: category.icon,
      });
    }
    return;
  }
  if (categoryPair.subcategory === undefined) {
    for (const category of configuration.categories) {
      if (category.subCategories !== undefined && replaceWhitespaceInString(category.name) === categoryPair.category) {
        for (const subcategory of category.subCategories) {
          content.push({
            title: subcategory.name,
            description: subcategory.description,
            href: `/overview/data/${replaceWhitespaceInString(category.name)}/${replaceWhitespaceInString(subcategory.name)}`,
            isCategory: true,
            icon: subcategory.icon,
          });
        }
      }
    }
  }
}

function addDatasetsToContent(
  content: OverviewRow[],
  resources: (EmbeddedResource | GeoJSONResource | JSONResource)[],
  categoryPair: { category?: string; subcategory?: string },
) {
  for (const resource of resources) {
    if (resourceShouldBeDisplayed(categoryPair, resource.category, resource.subcategory)) {
      content.push({
        title: resource.name,
        description: resource.description,
        href: `/view/${replaceWhitespaceInString(resource.name)}-${resource.id}`,
        isCategory: false,
        resourceType: resource.type,
        icon: getIconForResource(resource),
      });
    }
  }
}

function resourceShouldBeDisplayed(
  categoryPair: { category?: string; subcategory?: string },
  resourceCategory?: string,
  resourceSubcategory?: string,
) {
  if (categoryPair.category === undefined) {
    return false;
  }
  if (
    resourceCategory === undefined ||
    decodeURIComponent(categoryPair.category) !== replaceWhitespaceInString(resourceCategory)
  ) {
    return false;
  }
  if (categoryPair.subcategory === undefined) {
    return true;
  }
  return (
    resourceSubcategory !== undefined &&
    decodeURIComponent(categoryPair.subcategory) === replaceWhitespaceInString(resourceSubcategory)
  );
}

function saveStringCompare(paramString: string, configString: string) {
  return decodeURIComponent(paramString).toLowerCase() === replaceWhitespaceInString(configString).toLowerCase();
}
