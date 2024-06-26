import { Configuration, DashboardContent as Content } from '@/schemas/configuration/configurationSchema';
import { categoryToDataElement, dashboardToDataElement, resourceToDataElement } from '@/utils/mapUtils';

import { CSSProperties } from 'react';
import CarouselContent from './CarouselContent';
import { DataElement } from '@/types/data';
import ErrorComponent from '../../error-handling/ErrorComponent';
import ExternalContent from './ExternalContent';
import ExternalLinkContent from './ExternalLinkContent';
import InternalLinkContent from './InternalLinkContent';
import ResourceContent from './ResourceContent';
import TextContent from './TextContent';

// eslint-disable-next-line max-lines-per-function, max-statements
export default function DashboardContent({
  content,
  configuration,
  className,
  style,
}: {
  content: Content;
  configuration: Configuration;
  className?: string;
  style?: CSSProperties;
}) {
  if (content.type === 'EXTERNAL') {
    return <ExternalContent content={content} className={className} style={style} />;
  }
  if (content.type === 'TEXT') {
    return <TextContent content={content} className={className} style={style} />;
  }
  if (content.type === 'TEXT_CAROUSEL') {
    return <CarouselContent content={content} />;
  }
  if (content.type === 'RESOURCE') {
    const resource = configuration.resources.find((resource) => resource.id === content.resourceId);
    if (!resource) {
      return (
        <ErrorComponent
          type="configurationError"
          error={`'Dashboard resource with id ${content.resourceId} not found in configuration!'`}
        />
      );
    }
    return <ResourceContent content={content} resource={resource} className={className} style={style} />;
  }

  if (content.type === 'LINK_INTERNAL') {
    let element: DataElement | undefined;

    switch (content.linkedType) {
      case 'dashboard': {
        const dashboard = configuration.dashboards.find((dashboard) => dashboard.id === content.uniqueIdentifier);
        element = dashboard && dashboardToDataElement(dashboard);
        break;
      }
      case 'category': {
        const category = configuration.categories.find((category) => category.name === content.uniqueIdentifier);
        element = category && categoryToDataElement(category);
        break;
      }
      case 'subcategory': {
        const subcategory = configuration.categories
          .flatMap((category) =>
            (category.subcategories ?? []).map((subcategory) => ({
              ...subcategory,
              categoryName: category.name,
            })),
          )
          .filter((subcategory) => subcategory.name === content.uniqueIdentifier)
          .map((subcategory) => categoryToDataElement(subcategory, subcategory.categoryName));
        element = subcategory.length > 0 ? subcategory[0] : undefined;
        break;
      }
      case 'resource': {
        const resource = configuration.resources.find((resource) => resource.id === content.uniqueIdentifier);
        element = resource && resourceToDataElement(resource);
        break;
      }
      default:
    }

    return element ? (
      <InternalLinkContent content={content} element={element} className={className} style={style} />
    ) : (
      <ErrorComponent
        type="configurationError"
        error={`'Dashboard resource with uniqueIdentifier ${content.uniqueIdentifier} not found in configuration!'`}
      />
    );
  }
  return <ExternalLinkContent content={content} className={className} style={style} />;
}
