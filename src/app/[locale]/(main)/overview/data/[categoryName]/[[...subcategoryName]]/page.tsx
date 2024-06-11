import { Category, Configuration } from '@/schemas/configuration-schema';
import Overview, { OverviewRow } from '@/components/overview/Overview';
import { replaceWhitespaceInString, saveStringCompare } from '@/utils/stringUtils';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import PageWrapper from '@/components/PageWrapper';
import { getConfiguration } from '@/configuration';
import { getIconForResource } from '@/utils/icons';

export default async function Page({
  params: { categoryName, subcategoryName },
}: {
  params: { categoryName: string; subcategoryName?: string[] };
}) {
  const { success, configuration, error } = await getConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }

  const category = configuration.categories.find((item) => saveStringCompare(categoryName, item.name));
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
  const subcategory = category.subcategories?.find((sub) => saveStringCompare(subcategoryNameString, sub.name));
  if (subcategoryName.length > 1 || !subcategory) {
    return <ErrorComponent type="notFound" />;
  }

  return (
    <PageWrapper title={subcategory.name} description={subcategory.description}>
      <Overview content={getCategoryContent(configuration, subcategory)} />
    </PageWrapper>
  );
}

function getCategoryContent(configuration: Configuration, category: Category) {
  const subcategories =
    category.subcategories?.map((subcategory) => ({
      title: subcategory.name,
      description: subcategory.description,
      href: `/overview/data/${replaceWhitespaceInString(category.name).toLowerCase()}/${replaceWhitespaceInString(subcategory.name)}`,
      isCategory: true,
      icon: subcategory.icon,
    })) ?? [];
  const resources = getResourcesForCategory(configuration, category);
  return [...resources, ...subcategories].sort((a, b) => {
    if (a.isCategory && !b.isCategory) {
      return -1;
    }
    if (!a.isCategory && b.isCategory) {
      return 1;
    }
    return 0;
  }) as OverviewRow[];
}

function getResourcesForCategory(configuration: Configuration, category: Category) {
  return configuration.resources
    .filter((resource) => category.resources?.includes(resource.id.toLowerCase()))
    .map((resource) => ({
      title: resource.name,
      description: resource.description,
      href: `/view/${replaceWhitespaceInString(resource.name)}-${resource.id}`,
      isCategory: false,
      resourceType: resource.type,
      icon: getIconForResource(resource),
    }));
}
