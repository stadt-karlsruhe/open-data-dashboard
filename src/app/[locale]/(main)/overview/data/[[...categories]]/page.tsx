import { Category, Configuration, configurationSchema } from '@/schemas/configuration-schema';
import Overview, { OverviewRow } from '@/components/overview/Overview';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { computeIfAbsent } from '@/utils/maputils';
import { getConfiguration } from '@/configuration';
import { getIconForResource } from '@/icons';
import { getTranslations } from 'next-intl/server';
import { replaceWhitespaceInString } from '@/utils/stringutils';

const paramsToCategory: Map<CategoryPair, Category> = new Map<CategoryPair, Category>();
const paramsToContent: Map<CategoryPair, OverviewRow[]> = new Map<CategoryPair, OverviewRow[]>();

interface CategoryPair {
  category?: string;
  subcategory?: string;
  inValid?: boolean;
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
  const categoryPair = parseParams(parsedConfiguration.data.categories, params.categories);
  if (categoryPair.inValid) {
    return <ErrorComponent type="notFound" />;
  }

  const header = getHeader(categoryPair, parsedConfiguration.data.categories) ?? {
    name: t('dataTitle'),
    description: t('dataDescription'),
  };
  return <Overview content={getContent(parsedConfiguration.data, categoryPair)} header={header} />;
}

function parseParams(configCategories: Category[], categories?: string[]) {
  if (categories === undefined) {
    return {};
  }
  if (categories.length > 2) {
    return {
      inValid: true,
    } as CategoryPair;
  }
  const [category] = categories;
  const subcategory = categories.length > 1 ? categories[1] : undefined;
  if (
    computeIfAbsent(paramsToCategory, { category, subcategory }, () =>
      computeCategory(configCategories, category, subcategory),
    ) === undefined
  ) {
    return {
      inValid: true,
    } as CategoryPair;
  }
  return {
    category,
    subcategory,
  } as CategoryPair;
}

function getHeader(categoryPair: CategoryPair, configCategories: Category[]) {
  if (categoryPair.category !== undefined) {
    const header = computeIfAbsent(paramsToCategory, categoryPair, () =>
      computeCategory(configCategories, categoryPair.category as string, categoryPair.subcategory),
    );
    return header as {
      name: string;
      description: string;
    };
  }
}

function getContent(configuration: Configuration, categoryPair: CategoryPair) {
  return computeIfAbsent(paramsToContent, categoryPair, () =>
    computeContent(configuration, categoryPair),
  ) as OverviewRow[];
}

function computeContent(configuration: Configuration, categoryPair: CategoryPair) {
  const content: OverviewRow[] = [];

  if (categoryPair.category === undefined) {
    configuration.categories.forEach((category) =>
      content.push({
        title: category.name,
        description: category.description,
        href: `/overview/data/${replaceWhitespaceInString(category.name)}`,
        isCategory: true,
        icon: category.icon,
      }),
    );
    return content;
  }

  const category = computeIfAbsent(paramsToCategory, categoryPair, () =>
    computeCategory(configuration.categories, categoryPair.category as string, categoryPair.subcategory),
  ) as Category;

  category.subcategories?.forEach((subcategory) =>
    content.push({
      title: subcategory.name,
      description: subcategory.description,
      href: `/overview/data/${replaceWhitespaceInString(category.name)}/${replaceWhitespaceInString(subcategory.name)}`,
      isCategory: true,
      icon: subcategory.icon,
    }),
  );

  configuration.resources
    .filter((resource) => category.resources?.includes(resource.id))
    .forEach((resource) =>
      content.push({
        title: resource.name,
        description: resource.description,
        href: `/view/${replaceWhitespaceInString(resource.name)}-${resource.id}`,
        isCategory: false,
        resourceType: resource.type,
        icon: getIconForResource(resource),
      }),
    );
  return content;
}

function computeCategory(configCategories: Category[], category: string, subcategory?: string) {
  for (const configCategory of configCategories) {
    if (saveStringCompare(category, configCategory.name)) {
      if (subcategory === undefined) {
        return configCategory;
      }
      if (configCategory.subcategories === undefined) {
        return;
      }
      return configCategory.subcategories
        .filter((configSubcategory) => saveStringCompare(subcategory, configSubcategory.name))
        .pop();
    }
  }
}

function saveStringCompare(paramString: string, configString: string) {
  return decodeURIComponent(paramString).toLowerCase() === replaceWhitespaceInString(configString).toLowerCase();
}
