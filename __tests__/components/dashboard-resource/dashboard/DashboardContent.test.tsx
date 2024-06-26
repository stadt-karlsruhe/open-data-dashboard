/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import {
  mockCarouselContent,
  mockExternalContent,
  mockInternalLinkContentCategory,
  mockInternalLinkContentDashboard,
  mockInternalLinkContentResource,
  mockInternalLinkContentSubcategory,
  mockResourceContent,
  mockTextContent,
} from '~/data/dashboardContents';
import { render, screen } from '@testing-library/react';

import DashboardContent from '@/components/dashboard-resource/dashboard/DashboardContent';
import { mockConfiguration } from '~/data/configurations';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/dashboard-resource/dashboard/ResourceContent', () =>
  jest.fn(() => <div>Mocked ResourceContent</div>),
);
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/error-handling/ErrorComponent', () => jest.fn(() => <div>Mocked ErrorComponent</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/dashboard-resource/dashboard/ExternalContent', () =>
  jest.fn(() => <div>Mocked ExternalContent</div>),
);
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/dashboard-resource/dashboard/TextContent', () => jest.fn(() => <div>Mocked TextContent</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/dashboard-resource/dashboard/CarouselContent', () =>
  jest.fn(() => <div>Mocked CarouselContent</div>),
);
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/dashboard-resource/dashboard/InternalLinkContent', () =>
  jest.fn(() => <div>Mocked InternalLinkContent</div>),
);

// eslint-disable-next-line max-lines-per-function
describe('component DashboardContent', () => {
  it('should render ExternalContent component for external content', () => {
    expect.hasAssertions();
    render(<DashboardContent content={mockExternalContent} configuration={mockConfiguration} />);
    expect(screen.getByText('Mocked ExternalContent')).toBeInTheDocument();
  });

  it('should render TextContent component for text', () => {
    expect.hasAssertions();
    render(<DashboardContent content={mockTextContent} configuration={mockConfiguration} />);
    expect(screen.getByText('Mocked TextContent')).toBeInTheDocument();
  });

  it('should render CarouselContent component for carousels', () => {
    expect.hasAssertions();
    render(<DashboardContent content={mockCarouselContent} configuration={mockConfiguration} />);
    expect(screen.getByText('Mocked CarouselContent')).toBeInTheDocument();
  });

  it('should render ResourceContent component for resources', () => {
    expect.hasAssertions();
    render(<DashboardContent content={mockResourceContent} configuration={mockConfiguration} />);
    expect(screen.getByText('Mocked ResourceContent')).toBeInTheDocument();
  });

  it('should render InternalLinkContent component for links to resources', () => {
    expect.hasAssertions();
    render(<DashboardContent content={mockInternalLinkContentResource} configuration={mockConfiguration} />);
    // eslint-disable-next-line sonarjs/no-duplicate-string
    expect(screen.getByText('Mocked InternalLinkContent')).toBeInTheDocument();
  });

  it('should render InternalLinkContent component for links to dashboards', () => {
    expect.hasAssertions();
    render(<DashboardContent content={mockInternalLinkContentDashboard} configuration={mockConfiguration} />);
    expect(screen.getByText('Mocked InternalLinkContent')).toBeInTheDocument();
  });

  it('should render InternalLinkContent component for links to categories', () => {
    expect.hasAssertions();
    render(<DashboardContent content={mockInternalLinkContentCategory} configuration={mockConfiguration} />);
    expect(screen.getByText('Mocked InternalLinkContent')).toBeInTheDocument();
  });

  it('should render InternalLinkContent component for links to subcategories', () => {
    expect.hasAssertions();
    render(<DashboardContent content={mockInternalLinkContentSubcategory} configuration={mockConfiguration} />);
    expect(screen.getByText('Mocked InternalLinkContent')).toBeInTheDocument();
  });

  it('should render ErrorContent component if resource is not found in the configuration', () => {
    expect.hasAssertions();
    render(
      <DashboardContent
        content={{ ...mockResourceContent, resourceId: 'not-found' }}
        configuration={mockConfiguration}
      />,
    );
    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });
});
