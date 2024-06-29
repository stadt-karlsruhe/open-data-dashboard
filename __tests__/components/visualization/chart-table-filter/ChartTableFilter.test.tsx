/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import ChartTableFilter from '@/components/visualization/chart-table-filter/ChartTableFilter';
import { jsonResource } from '~/data/resources';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/chart-table-filter/ChartTableFilterHeader', () =>
  jest.fn(() => <div>Mocked ChartTableFilterHeader</div>),
);
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/chart-table-filter/CurrentFilters', () =>
  jest.fn(() => <div>Mocked CurrentFilters</div>),
);
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/chart-table-filter/ChartTableFilterBody', () =>
  jest.fn(() => <div>Mocked ChartTableFilterBody</div>),
);

describe('component ChartTableFilter', () => {
  it('should render the required components', () => {
    expect.hasAssertions();

    render(
      <ChartTableFilter
        resource={{ ...jsonResource, defaultFilters: { testFilter: 'value' } }}
        data={[]}
        onFilter={jest.fn()}
      />,
    );

    expect(screen.getByText('Mocked ChartTableFilterHeader')).toBeInTheDocument();
    expect(screen.getByText('Mocked CurrentFilters')).toBeInTheDocument();
    expect(screen.getByText('Mocked ChartTableFilterBody')).toBeInTheDocument();
  });
});
