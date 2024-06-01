/**
 * @jest-environment jsdom
 */
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import GeoMap from '@/components/visualization/map/GeoMap';
import { NextIntlClientProvider } from 'next-intl';
import { geoJSON } from '../data/dataFormats';
import { geoJSONResource } from '../data/resources';
import messages from '@/messages/en.json';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('react-leaflet', () => {
  return {
    MapContainer: jest.fn(({ children }) => <div data-testid="MapContainer">{children}</div>),
    Marker: jest.fn(({ children }) => <div data-testid="Marker">{children}</div>),
    FeatureGroup: jest.fn(({ children }) => <div data-testid="FeatureGroup">{children}</div>),
    Tooltip: jest.fn(({ children }) => <div data-testid="Tooltip">{children}</div>),
    TileLayer: jest.fn(() => <div data-testid="TileLayer" />),
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    useMap: jest.fn(() => {}),
  };
});

describe('component GeoMap', () => {
  it('should render all map components', () => {
    expect.hasAssertions();
    const { getByTestId } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <GeoMap resource={geoJSONResource} geoJsonData={geoJSON as GeoJSON.FeatureCollection} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByTestId('MapContainer')).toBeInTheDocument();
    const [marker] = screen.getAllByTestId('Marker');
    expect(marker).toBeInTheDocument();
    const [featureGroup] = screen.getAllByTestId('FeatureGroup');
    expect(featureGroup).toBeInTheDocument();
    const [tooltip] = screen.getAllByTestId('Tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(screen.getByTestId('TileLayer')).toBeInTheDocument();
  });
});
