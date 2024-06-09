import {
  Category,
  Configuration,
  EmbeddedResource,
  GeoJSONResource,
  JSONResource,
} from '@/schemas/configuration-schema';
import Overview, { OverviewRow } from '@/components/overview/Overview';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { computeIfAbsent } from '@/utils/maputils';
import { getConfiguration } from '@/configuration';
import { getTranslations } from 'next-intl/server';
import { replaceWhitespaceInString } from '@/utils/stringutils';

const paramsToHeader: Map<string[], { title: string; description: string | undefined }> = new Map<
  string[],
  { title: string; description: string | undefined }
>();

export default async function Page({ params }: { params: { categories: string[] | undefined } }) {
  const configuration = await getConfiguration();
  const t = await getTranslations('Overview');
  if (!configuration.success || configuration.data?.resources === undefined) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }
  // TODO: Better validity check for the path
  if (params.categories !== undefined && params.categories.length > 2) {
    return <ErrorComponent type="notFound" />;
  }
  const header = getHeader(params.categories, configuration.data.categories) ?? {
    title: t('dataTitle'),
    description: t('dataDescription'),
  };
  return <Overview content={getContent(configuration.data, params.categories)} header={header} />;
}

function getContent(configuration: Configuration, categories: string[] | undefined) {
  const content: OverviewRow[] = [];
  addCategoriesToContent(content, configuration, categories);
  addDatasetsToContent(content, configuration.resources, categories);
  return content;
}

// TODO: make this function nicer and more compact
function addCategoriesToContent(
  content: OverviewRow[],
  configuration: Configuration,
  categories: string[] | undefined,
) {
  if (categories === undefined) {
    for (const category of configuration.categories) {
      content.push({
        title: category.name,
        description: category.description,
        href: `/overview/data/${replaceWhitespaceInString(category.name)}`,
        isCategory: true,
      });
    }
    return;
  }
  if (categories.length < 2) {
    for (const category of configuration.categories) {
      if (category.subCategories !== undefined && replaceWhitespaceInString(category.name) === categories[0]) {
        for (const subcategory of category.subCategories) {
          content.push({
            title: subcategory.name,
            description: subcategory.description,
            href: `/overview/data/${replaceWhitespaceInString(category.name)}/${replaceWhitespaceInString(subcategory.name)}`,
            isCategory: true,
          });
        }
      }
    }
  }
}

function addDatasetsToContent(
  content: OverviewRow[],
  resources: (EmbeddedResource | GeoJSONResource | JSONResource)[],
  categories: string[] | undefined,
) {
  for (const resource of resources) {
    if (resourceShouldBeDisplayed(resource.category, resource.subcategory, categories)) {
      content.push({
        title: resource.name,
        description: resource.description,
        href: `/view/${replaceWhitespaceInString(resource.name)}-${resource.id}`,
        isCategory: false,
        resourceType: resource.type,
      });
    }
  }
}

function resourceShouldBeDisplayed(
  resourceCategory: string | undefined,
  resourceSubcategory: string | undefined,
  categories: string[] | undefined,
) {
  if (categories === undefined) {
    return true;
  }
  if (
    resourceCategory === undefined ||
    decodeURIComponent(categories[0]) !== replaceWhitespaceInString(resourceCategory)
  ) {
    return false;
  }
  if (categories.length < 2) {
    return true;
  }
  return (
    resourceSubcategory !== undefined &&
    decodeURIComponent(categories[1]) === replaceWhitespaceInString(resourceSubcategory)
  );
}

function getHeader(categories: string[] | undefined, configCategories: Category[]) {
  if (categories !== undefined) {
    const header = computeIfAbsent(paramsToHeader, categories, computeHeader(categories, configCategories));
    if (header !== undefined) {
      return header as {
        title: string;
        description: string;
      };
    }
  }
}

function computeHeader(categories: string[], configCategories: Category[]) {
  for (const configCategory of configCategories) {
    if (decodeURIComponent(categories[0]) === replaceWhitespaceInString(configCategory.name)) {
      if (categories.length < 2) {
        return {
          title: configCategory.name,
          description: configCategory.description,
        };
      }
      if (configCategory.subCategories === undefined) {
        return;
      }
      for (const configSubcategory of configCategory.subCategories) {
        if (decodeURIComponent(categories[1]) === replaceWhitespaceInString(configSubcategory.name)) {
          return {
            title: configSubcategory.name,
            description: configSubcategory.description,
          };
        }
      }
    }
  }
}
