/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Page from '@/app/[locale]/(embed)/embed/resource/[resourceId]/page';
import { getValidatedConfiguration } from '@/schemas/validate';
import { mockConfiguration } from '~/data/configurations';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/EmbeddedViewer', () => jest.fn(() => <div>Mocked EmbeddedViewer</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/Visualization', () => jest.fn(() => <div>Mocked Visualization</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/error-handling/ErrorComponent', () => jest.fn(() => <div>Mocked ErrorComponent</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/schemas/validate', () => {
  return {
    getValidatedData: jest.fn(),
    getValidatedConfiguration: jest.fn(),
  };
});

describe('embedded resource page', () => {
  it('should render the EmbeddedViewer component for an embedded resource', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { resourceId: '2' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked EmbeddedViewer')).toBeInTheDocument();
  });

  it('should render the Visualization component for non-embedded resources', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { resourceId: '1' } };

    const PageComponent = await Page({ params });
    render(PageComponent);

    expect(screen.getByText('Mocked Visualization')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if the resource is not found', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const { params } = { params: { resourceId: 'non-existent-resource' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });

  it('should render the ErrorComponent component if the configuration returned errors', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: false, configuration: undefined, error: 'error' });
    const { params } = { params: { resourceId: 'non-existent-resource' } };
    const PageComponent = await Page({ params });

    render(PageComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });
});
