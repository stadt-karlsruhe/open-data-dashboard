/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Page from '@/app/[locale]/(main)/home/page';
import { getValidatedConfiguration } from '@/schemas/validate';
import { mockConfiguration } from '~/data/configurations';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(() => Promise.resolve((key: string) => `Mocked translation for ${key}`)),
}));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next/image', () => jest.fn(() => <div>Mocked Image</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/search/Search', () => jest.fn(() => <div>Mocked Search</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/dashboard-resource/dashboard/DashboardContents', () =>
  jest.fn(() => <div>Mocked DashboardContents</div>),
);
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/schemas/validate', () => {
  return {
    getValidatedData: jest.fn(),
    getValidatedConfiguration: jest.fn(),
  };
});

describe('homepage page', () => {
  it('should render the Image, Search and DashboardContents components', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const PageComponent = await Page();

    render(PageComponent);

    expect(screen.getByText('Mocked Image')).toBeInTheDocument();
    expect(screen.getByText('Stadt Karlsruhe, Roland Fränkle')).toBeInTheDocument();
    expect(screen.getByText('Mocked Search')).toBeInTheDocument();
    expect(screen.getByText('Mocked DashboardContents')).toBeInTheDocument();
  });
});
