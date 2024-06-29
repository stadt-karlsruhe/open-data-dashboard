/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { embeddedResource, geoJSONResource, jsonResource } from '~/data/resources';
import { render, screen } from '@testing-library/react';

import ResourceDetails from '@/components/dashboard-resource/ResourceDetails';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next/dynamic', () => {
  // eslint-disable-next-line react/display-name
  return jest.fn(() => () => <div>Mocked DashboardResourceControls</div>);
});
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/EmbeddedViewer', () => jest.fn(() => <div>Mocked EmbeddedViewer</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/Visualization', () => jest.fn(() => <div>Mocked Visualization</div>));

describe('component ResourceDetails', () => {
  it('should render Visualization component for JSON resources', () => {
    expect.hasAssertions();
    render(<ResourceDetails resource={jsonResource} />);

    // eslint-disable-next-line sonarjs/no-duplicate-string
    expect(screen.getByText('Mocked DashboardResourceControls')).toBeInTheDocument();
    // eslint-disable-next-line sonarjs/no-duplicate-string
    expect(screen.getByText('Mocked Visualization')).toBeInTheDocument();
    // eslint-disable-next-line sonarjs/no-duplicate-string
    expect(screen.queryByText('Mocked EmbeddedViewer')).not.toBeInTheDocument();
  });

  it('should render Visualization component for GeoJSON resources', () => {
    expect.hasAssertions();
    render(<ResourceDetails resource={geoJSONResource} />);

    expect(screen.getByText('Mocked DashboardResourceControls')).toBeInTheDocument();
    expect(screen.getByText('Mocked Visualization')).toBeInTheDocument();
    expect(screen.queryByText('Mocked EmbeddedViewer')).not.toBeInTheDocument();
  });

  it('should render EmbeddedViewer component for PDF/HTML resources', () => {
    expect.hasAssertions();
    render(<ResourceDetails resource={embeddedResource} />);

    expect(screen.getByText('Mocked DashboardResourceControls')).toBeInTheDocument();
    expect(screen.queryByText('Mocked Visualization')).not.toBeInTheDocument();
    expect(screen.queryByText('Mocked EmbeddedViewer')).toBeInTheDocument();
  });
});
