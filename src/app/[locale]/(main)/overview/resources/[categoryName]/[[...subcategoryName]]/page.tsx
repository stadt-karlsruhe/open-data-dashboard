import { Category, Configuration } from '@/schemas/configurationSchema';
import Overview, { OverviewRow } from '@/components/overview/Overview';
import { concatenateNameAndId, replaceWhitespaceInString, safeStringCompare } from '@/utils/stringUtils';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import PageWrapper from '@/components/layout/PageWrapper';
import { computeIfAbsent } from '@/utils/mapUtils';
import { getIconForResource } from '@/utils/icons';
import { getValidatedConfiguration } from '@/schemas/validate';

const categoryToContent: Map<string, OverviewRow[]> = new Map<string, OverviewRow[]>();

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
        <Overview content={getCategoryContent(configuration, category)} />
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
      <Overview content={getCategoryContent(configuration, subcategory, categoryName)} />
    </PageWrapper>
  );
}

function getCategoryContent(configuration: Configuration, category: Category, categoryName?: string) {
  const mapKey = categoryName === undefined ? category.name : categoryName + category.name;
  return computeIfAbsent(categoryToContent, mapKey, () =>
    computeCategoryContent(configuration, category),
  ) as OverviewRow[];
}

function computeCategoryContent(configuration: Configuration, category: Category) {
  const subcategories =
    category.subcategories?.map((subcategory) => ({
      title: subcategory.name,
      description: subcategory.description,
      href: `/overview/resources/${replaceWhitespaceInString(category.name).toLowerCase()}/${replaceWhitespaceInString(subcategory.name).toLowerCase()}`,
      isCategory: true,
      icon: subcategory.icon,
    })) ?? [];
  const resources = getResourcesForCategory(configuration, category);
  return [...subcategories, ...resources] as OverviewRow[];
}

function getResourcesForCategory(configuration: Configuration, category: Category) {
  return configuration.resources
    .filter((resource) => category.resources?.includes(resource.id.toLowerCase()))
    .map((resource) => ({
      title: resource.name,
      description: resource.description,
      href: `/resource/${concatenateNameAndId(resource.name, resource.id)}`,
      isCategory: false,
      resourceType: resource.type,
      icon: getIconForResource(resource),
    }));
}
