/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { embeddedResource, jsonResource } from '~/data/resources';
import { render, screen } from '@testing-library/react';

import { NextIntlClientProvider } from 'next-intl';
import ResourceContent from '@/components/dashboard-resource/dashboard/ResourceContent';
import messages from '@/messages/en.json';
import { mockResourceContent } from '~/data/dashboardContents';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/Visualization', () => jest.fn(() => <div>Mocked Visualization</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/EmbeddedViewer', () => jest.fn(() => <div>Mocked EmbeddedViewer</div>));

describe('component ResourceContent', () => {
  it('should render Visualization component for non-embedded resources', () => {
    expect.hasAssertions();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ResourceContent resource={jsonResource} content={mockResourceContent} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('JSON Resource')).toBeInTheDocument();
    expect(screen.getByText('Mocked Visualization')).toBeInTheDocument();
  });

  it('should render EmbeddedViewer component for embedded resources', () => {
    expect.hasAssertions();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ResourceContent resource={embeddedResource} content={mockResourceContent} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('Embedded Resource')).toBeInTheDocument();
    expect(screen.getByText('Mocked EmbeddedViewer')).toBeInTheDocument();
  });
});
