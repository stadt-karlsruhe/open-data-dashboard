/**
 * @jest-environment jsdom
 */

import { csvResource, geoJSONResource, jsonResource } from '../data/resources';
import { csvValid, geoJSON, jsonFormatNotSupported, jsonStandard } from '../data/dataFormats';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Visualization from '@/components/visualization/layout/Visualization';

// eslint-disable-next-line jest/prefer-spy-on
global.fetch = jest.fn();

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next/dynamic', () => {
  // eslint-disable-next-line react/display-name
  return jest.fn(() => () => <div>Mocked GeoMap</div>);
});
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/error-handling/ErrorComponent', () => jest.fn(() => <div>Mocked ErrorComponent</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/layout/ChartTableWrapper', () =>
  jest.fn(() => <div>Mocked ChartTableWrapper</div>),
);

describe('component Visualization', () => {
  it('should render the ChartTableWrapper component for valid JSON data', async () => {
    expect.hasAssertions();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(jsonStandard),
    });

    const VisualizationComponent = await Visualization({ resource: jsonResource });
    render(VisualizationComponent);

    expect(screen.getByText('Mocked ChartTableWrapper')).toBeInTheDocument();
  });

  it('should render the ChartTableWrapper component for valid CSV data', async () => {
    expect.hasAssertions();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      text: () => Promise.resolve(csvValid),
    });

    const VisualizationComponent = await Visualization({ resource: csvResource });
    render(VisualizationComponent);

    expect(screen.getByText('Mocked ChartTableWrapper')).toBeInTheDocument();
  });

  it('should render the GeoMap component for valid GeoJSON data', async () => {
    expect.hasAssertions();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(geoJSON),
    });

    const VisualizationComponent = await Visualization({ resource: geoJSONResource });
    render(VisualizationComponent);

    expect(screen.getByText('Mocked GeoMap')).toBeInTheDocument();
  });

  it('should render the Error component for invalid JSON data', async () => {
    expect.hasAssertions();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(jsonFormatNotSupported),
    });

    const VisualizationComponent = await Visualization({ resource: jsonResource });
    render(VisualizationComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });
});
