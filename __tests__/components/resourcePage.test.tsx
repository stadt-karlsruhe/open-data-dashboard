/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Page from '@/app/[locale]/resource/[resourceId]/page';
import YAML from 'yaml';
import { promises as fs } from 'node:fs';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('yaml', () => ({
  parse: jest.fn(),
}));

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('node:fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/NotFound', () => jest.fn(() => <div>Mocked NotFound</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/layout/Visualization', () => jest.fn(() => <div>Mocked Visualization</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/EmbeddedViewer', () => jest.fn(() => <div>Mocked EmbeddedViewer</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('yaml', () => ({
  parse: jest.fn(),
}));

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('node:fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

const mockConfiguration = {
  resources: [
    { id: 'embedded-resource', type: 'Embedded' },
    { id: 'visualization-resource', type: 'JSON' },
  ],
};

describe('resource page', () => {
  it('should render the EmbeddedViewer component for an embedded resource', async () => {
    expect.hasAssertions();

    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockConfiguration));
    (YAML.parse as jest.Mock).mockReturnValueOnce(mockConfiguration);
    const { params } = { params: { resourceId: 'embedded-resource' } };

    const PageComponent = await Page({ params });
    render(PageComponent);

    expect(screen.getByText('Mocked EmbeddedViewer')).toBeInTheDocument();
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
