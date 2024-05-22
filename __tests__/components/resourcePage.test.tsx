/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Page from '@/app/[locale]/resource/[resourceId]/page';
import YAML from 'yaml';
import { promises as fs } from 'node:fs';

jest.mock<typeof import('@/components/NotFound')>('@/components/NotFound', () => {
  const actual = jest.requireActual<typeof import('@/components/NotFound')>('@/components/NotFound');
  return {
    __esModule: true,
    ...actual,
    default: jest.fn(() => <div>Mocked NotFound</div>),
    NotFound: jest.fn(() => <div>Mocked NotFound</div>),
  };
});
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
  resources: [
    { id: '1', type: 'Embedded', name: 'Embedded Resource', source: 'https://example.com' },
    { id: 'visualization-resource', type: 'JSON' },
  ],
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
    const { params } = { params: { resourceId: 'visualization-resource' } };

    const PageComponent = await Page({ params });
    render(PageComponent);

    expect(screen.getByText('Mocked Visualization')).toBeInTheDocument();
  });

  it('should render the NotFound component if the resource is not found', async () => {
    expect.hasAssertions();

    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockConfiguration));
    (YAML.parse as jest.Mock).mockReturnValueOnce(mockConfiguration);
    const { params } = { params: { resourceId: 'non-existent-resource' } };

    const PageComponent = await Page({ params });
    render(PageComponent);

    expect(screen.getByText('Mocked NotFound')).toBeInTheDocument();
  });
});
