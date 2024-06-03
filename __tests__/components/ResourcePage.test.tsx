/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { embeddedResource, jsonResource } from '../data/resources';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Page from '@/app/[locale]/(embedded)/resource/[resourceId]/page';
import YAML from 'yaml';
import { promises as fs } from 'node:fs';
import messages from '@/messages/en.json';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/layout/Visualization', () => jest.fn(() => <div>Mocked Visualization</div>));
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

const mockConfiguration = {
  resources: [embeddedResource, jsonResource],
};

describe('resource page', () => {
  it('should render the EmbeddedViewer component for an embedded resource', async () => {
    expect.hasAssertions();

    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockConfiguration));
    (YAML.parse as jest.Mock).mockReturnValueOnce(mockConfiguration);
    const { params } = { params: { resourceId: '1' } };

    const PageComponent = await Page({ params });
    const { getByTitle } = render(PageComponent);

    expect(getByTitle('Embedded Resource')).toBeInTheDocument();
  });

  it('should render the Visualization component for non-embedded resources', async () => {
    expect.hasAssertions();

    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockConfiguration));
    (YAML.parse as jest.Mock).mockReturnValueOnce(mockConfiguration);
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

    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockConfiguration));
    (YAML.parse as jest.Mock).mockReturnValueOnce(mockConfiguration);
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
