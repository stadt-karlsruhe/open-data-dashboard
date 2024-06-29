/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Page from '@/app/[locale]/(main)/dashboard/[dashboardNameAndId]/page';
import { getValidatedConfiguration } from '@/schemas/validate';
import { mockConfiguration } from '~/data/configurations';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next/dynamic', () => {
  // eslint-disable-next-line react/display-name
  return jest.fn(() => () => <div>Mocked DashboardResourceControls</div>);
});
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/dashboard-resource/dashboard/DashboardContents', () =>
  jest.fn(() => <div>Mocked DashboardContents</div>),
);
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/error-handling/ErrorComponent', () => jest.fn(() => <div>Mocked ErrorComponent</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/schemas/validate', () => {
  return {
    getValidatedData: jest.fn(),
    getValidatedConfiguration: jest.fn(),
  };
});

describe('dashboard page', () => {
  it('should render DashboardResourceControls and DashboardContents components', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { dashboardNameAndId: 'FirstDashboard-1' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked DashboardResourceControls')).toBeInTheDocument();
    expect(screen.getByText('Mocked DashboardContents')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if the dashboard is not found', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { dashboardNameAndId: 'non-existent-dashboard' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    // eslint-disable-next-line sonarjs/no-duplicate-string
    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if the page is called with the homepage dashboard', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { dashboardNameAndId: 'Homepage-homepage' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if the configuration returned errors', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: false, configuration: undefined, error: 'error' });
    const { params } = { params: { dashboardNameAndId: 'Homepage-homepage' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });
});
