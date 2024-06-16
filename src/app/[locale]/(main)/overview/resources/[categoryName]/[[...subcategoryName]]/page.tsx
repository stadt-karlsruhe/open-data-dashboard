import { Category, Configuration } from '@/schemas/configurationSchema';
import { computeIfUncached, configurationToResources, configurationToSubcategories } from '@/utils/mapUtils';

import { DataElement } from '@/types/data';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { LRUCache } from 'lru-cache';
import Overview from '@/components/overview/Overview';
import PageWrapper from '@/components/layout/PageWrapper';
import { getValidatedConfiguration } from '@/schemas/validate';
import { safeStringCompare } from '@/utils/stringUtils';

const options = {
  max: 100,
};

const categoryToContentCache: LRUCache<string, DataElement[]> = new LRUCache<string, DataElement[]>(options);

export default async function Page({
  params: { categoryName, subcategoryName },
}: {
  params: { categoryName: string; subcategoryName?: string[] };
}) {
  const { success, configuration, error } = await getValidatedConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }

  const category = configuration.categories.find((item) => safeStringCompare(categoryName, item.name));
  if (!category) {
    return <ErrorComponent type="notFound" />;
  }

  if (!subcategoryName || subcategoryName.length === 0) {
    return (
      <PageWrapper title={category.name} description={category.description}>
        <Overview content={getCategoryContent(configuration, category, category.name)} />
      </PageWrapper>
    );
  }

  const [subcategoryNameString] = subcategoryName;
  const subcategory = category.subcategories?.find((sub) => safeStringCompare(subcategoryNameString, sub.name));
  if (subcategoryName.length > 1 || !subcategory) {
    return <ErrorComponent type="notFound" />;
  }

  return (
    <PageWrapper title={subcategory.name} description={subcategory.description}>
      <Overview content={getCategoryContent(configuration, subcategory, `${category.name}-${subcategory.name}`)} />
    </PageWrapper>
  );
}

function getCategoryContent(configuration: Configuration, category: Category, categoryKey: string) {
  return computeIfUncached(categoryToContentCache, categoryKey, () =>
    computeCategoryContent(configuration, category),
  ) as DataElement[];
}

function computeCategoryContent(configuration: Configuration, category: Category) {
  const resources = configurationToResources(configuration, category);
  if (!category.subcategories) {
    return resources;
  }
  const subcategories = configurationToSubcategories(configuration, category);
  return [...subcategories, ...resources];
}
