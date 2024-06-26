/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Page from '@/app/[locale]/(main)/overview/resources/[categoryName]/[[...subcategoryName]]/page';
import { getValidatedConfiguration } from '@/schemas/validate';
import { mockConfiguration } from '~/data/configurations';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/overview/Overview', () => jest.fn(() => <div>Mocked Overview</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/error-handling/ErrorComponent', () => jest.fn(() => <div>Mocked ErrorComponent</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/schemas/validate', () => {
  return {
    getValidatedData: jest.fn(),
    getValidatedConfiguration: jest.fn(),
  };
});

// eslint-disable-next-line max-lines-per-function
describe('category/subcategory overview page', () => {
  it('should render the Overview component when no subcategory is provided', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { categoryName: 'Gesellschaft' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    // eslint-disable-next-line sonarjs/no-duplicate-string
    expect(screen.getByText('Mocked Overview')).toBeInTheDocument();
  });

  it('should render the Overview component when subcategoryName is an empty array', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { categoryName: 'Gesellschaft', subcategoryName: [] } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked Overview')).toBeInTheDocument();
  });

  it('should render the Overview component when valid category and subcategory are provided', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { categoryName: 'Gesellschaft', subcategoryName: ['Politik'] } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked Overview')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if the category is not found', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { categoryName: 'non-existent-category' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    // eslint-disable-next-line sonarjs/no-duplicate-string
    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if the provided subcategory is not found in the provided category', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { categoryName: 'Gesellschaft', subcategoryName: ['non-existent-subcategory'] } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if subcategoryName is an array with more than one element', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { categoryName: 'Gesellschaft', subcategoryName: ['Politik', ''] } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if the configuration returned errors', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: false, configuration: undefined, error: 'error' });
    const { params } = { params: { categoryName: 'Gesellschaft' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });
});
