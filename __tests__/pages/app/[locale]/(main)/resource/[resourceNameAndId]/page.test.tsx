/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Page from '@/app/[locale]/(main)/resource/[resourceNameAndId]/page';
import { getValidatedConfiguration } from '@/schemas/validate';
import { mockConfiguration } from '~/data/configurations';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/dashboard-resource/ResourceDetails', () => jest.fn(() => <div>Mocked ResourceDetails</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/error-handling/ErrorComponent', () => jest.fn(() => <div>Mocked ErrorComponent</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/schemas/validate', () => {
  return {
    getValidatedData: jest.fn(),
    getValidatedConfiguration: jest.fn(),
  };
});

describe('resource page', () => {
  it('should render the ResourceDetails component', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { resourceNameAndId: 'Karlsruher-Mietspiegel-2023-2' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked ResourceDetails')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if the resource is not found', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { resourceNameAndId: 'non-existent-resource' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });
});
