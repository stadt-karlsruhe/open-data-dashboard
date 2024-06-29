/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { jsonResource, jsonResourceWithChart } from '~/data/resources';
import { render, screen } from '@testing-library/react';

import ChartTableWrapper from '@/components/layout/ChartTableWrapper';
import { NextIntlClientProvider } from 'next-intl';
import { jsonStandard } from '~/data/dataFormats';
import messages from '@/messages/en.json';
import { usePathname } from 'next/navigation';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/bar-chart/BarChart', () => jest.fn(() => <div>Mocked BarChart</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next/dynamic', () => {
  // eslint-disable-next-line react/display-name
  return jest.fn(() => () => <div>Mocked Table</div>);
});
const mockPathname = jest.mocked(usePathname);

// eslint-disable-next-line max-lines-per-function
describe('component ChartTableWrapper', () => {
  it('should render BarChart when showOnlyFirstVis is true and visualizations contain barChart', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChartTableWrapper
          resource={jsonResourceWithChart}
          transformedData={jsonStandard}
          options={{ showFilter: false, useQueryParams: false, showOnlyFirstVis: true }}
        />
      </NextIntlClientProvider>,
    );

    // eslint-disable-next-line sonarjs/no-duplicate-string
    expect(screen.getByText('Mocked BarChart')).toBeInTheDocument();
    // eslint-disable-next-line sonarjs/no-duplicate-string
    expect(screen.queryByText('Mocked Table')).not.toBeInTheDocument();
  });

  it('should render Table when showOnlyFirstVis is true and visualizations do not contain barChart', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChartTableWrapper
          resource={jsonResource}
          transformedData={jsonStandard}
          options={{ showFilter: false, useQueryParams: false, showOnlyFirstVis: true }}
        />
      </NextIntlClientProvider>,
    );

    expect(screen.queryByText('Mocked BarChart')).not.toBeInTheDocument();
    expect(screen.queryByText('Mocked Table')).toBeInTheDocument();
  });

  it('should render both BarChart and Table when showOnlyFirstVis is false and visualizations contain barChart', () => {
    expect.hasAssertions();
    mockPathname.mockReturnValue('/embed');
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChartTableWrapper
          resource={jsonResourceWithChart}
          transformedData={jsonStandard}
          options={{ showFilter: false, useQueryParams: false, showOnlyFirstVis: false }}
        />
      </NextIntlClientProvider>,
    );

    expect(screen.queryByText('Mocked BarChart')).toBeInTheDocument();
    expect(screen.queryByText('Mocked Table')).toBeInTheDocument();

    mockPathname.mockReset();
  });

  it('should render only Table when showOnlyFirstVis is false and visualizations do not contain barChart', () => {
    expect.hasAssertions();
    mockPathname.mockReturnValue('/resource');
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChartTableWrapper
          resource={jsonResource}
          transformedData={jsonStandard}
          options={{ showFilter: false, useQueryParams: false, showOnlyFirstVis: false }}
        />
      </NextIntlClientProvider>,
    );

    expect(screen.queryByText('Mocked BarChart')).not.toBeInTheDocument();
    expect(screen.queryByText('Mocked Table')).toBeInTheDocument();

    mockPathname.mockReset();
  });
});
