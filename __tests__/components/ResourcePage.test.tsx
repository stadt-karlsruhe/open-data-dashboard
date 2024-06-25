/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { embeddedResource, jsonResource } from '../data/resources';
import { render, screen } from '@testing-library/react';

import { Configuration } from '@/schemas/configuration/configurationSchema';
import { NextIntlClientProvider } from 'next-intl';
import Page from '@/app/[locale]/(embed)/embed/resource/[resourceId]/page';
import { getValidatedConfiguration } from '@/schemas/validate';
import messages from '@/messages/en.json';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/Visualization', () => jest.fn(() => <div>Mocked Visualization</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('yaml', () => ({
  parse: jest.fn(),
}));
jest.mock<typeof import('node:fs')>('node:fs', () => {
  const actual = jest.requireActual<typeof import('node:fs')>('node:fs');
  return {
    ...actual,
    promises: {
      ...actual.promises,
      readFile: jest.fn(),
    },
  };
});
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/schemas/validate', () => {
  return {
    getValidatedData: jest.fn(),
    getValidatedConfiguration: jest.fn(),
  };
});

const mockConfiguration = {
  resources: [embeddedResource, jsonResource],
};

describe('resource page', () => {
  it('should render the EmbeddedViewer component for an embedded resource', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration as Configuration, error: undefined });
    const { params } = { params: { resourceId: '1' } };

    const PageComponent = await Page({ params });
    const { getByTitle } = render(PageComponent);

    expect(getByTitle('Embedded Resource')).toBeInTheDocument();
  });

  it('should render the Visualization component for non-embedded resources', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration as Configuration, error: undefined });
    const { params } = { params: { resourceId: '2' } };

    const PageComponent = await Page({ params });
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {PageComponent}
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('Mocked Visualization')).toBeInTheDocument();
  });

  it('should render the Error component if the resource is not found', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration as Configuration, error: undefined });
    const { params } = { params: { resourceId: 'non-existent-resource' } };

    const PageComponent = await Page({ params });
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {PageComponent}
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(messages.Error.notFoundTitle)).toBeInTheDocument();
    expect(screen.getByText(messages.Error.notFoundSubtitle)).toBeInTheDocument();
  });
});
