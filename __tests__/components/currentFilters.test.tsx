/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import CurrentFilters from '@/components/visualization/chart-table-filter/CurrentFilters';
import { NextIntlClientProvider } from 'next-intl';
import { filterMixed } from '../data/dataFilters';
import messages from '@/messages/en.json';

const allEntries = 'all-entries';
const defaultProps = {
  filters: filterMixed,
  onClear: jest.fn(),
};

// eslint-disable-next-line max-lines-per-function
describe('component CurrentFilters', () => {
  const renderComponent = (props: typeof defaultProps) => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <CurrentFilters {...props} />
      </NextIntlClientProvider>,
    );
  };

  it('should render the text filters correctly with all-entries filter at the front', () => {
    expect.hasAssertions();

    renderComponent(defaultProps);
    const allEntriesFilter = screen.getByText(
      `${messages.CurrentFilters.allEntriesLabel} ${messages.CurrentFilters.contains} "${filterMixed[allEntries]}"`,
    );
    const textFilter = screen.getByText(
      `StringColumn ${messages.CurrentFilters.contains} "${filterMixed.StringColumn}"`,
    );

    expect(allEntriesFilter).toBeInTheDocument();
    expect(textFilter).toBeInTheDocument();
    // allEntriesFilter should be rendered before textFilter
    expect(allEntriesFilter.compareDocumentPosition(textFilter)).toBe(4);
  });

  it('should render number filters correctly', () => {
    expect.hasAssertions();

    renderComponent(defaultProps);

    expect(
      screen.getByText(`${filterMixed.IntegerColumn.min} ≤ IntegerColumn ≤ ${filterMixed.IntegerColumn.max}`),
    ).toBeInTheDocument();
  });

  it('should call onClear when clear button is clicked', () => {
    expect.hasAssertions();

    renderComponent(defaultProps);
    const clearButtonAllEntries = screen.getByRole('button', {
      name: `${messages.CurrentFilters.allEntriesLabel} ${messages.CurrentFilters.contains} "${filterMixed[allEntries]}"`,
    });
    const clearButtonTextFilter = screen.getByRole('button', {
      name: `StringColumn ${messages.CurrentFilters.contains} "${filterMixed.StringColumn}"`,
    });
    const clearButtonNumberFilter = screen.getByRole('button', {
      name: `${filterMixed.IntegerColumn.min} ≤ IntegerColumn ≤ ${filterMixed.IntegerColumn.max}`,
    });
    fireEvent.click(clearButtonAllEntries);
    fireEvent.click(clearButtonTextFilter);
    fireEvent.click(clearButtonNumberFilter);

    expect(defaultProps.onClear).toHaveBeenCalledTimes(3);
    expect(defaultProps.onClear).toHaveBeenCalledWith(allEntries, '');
    expect(defaultProps.onClear).toHaveBeenCalledWith('StringColumn', '');
    expect(defaultProps.onClear).toHaveBeenCalledWith('IntegerColumn', '');
  });

  it('should handle equal min and max in number filter correctly', () => {
    expect.hasAssertions();

    const props = {
      ...defaultProps,
      filters: {
        IntegerColumn: { min: '15', max: '15' },
      },
    };

    renderComponent(props as typeof defaultProps);

    expect(screen.getByText(`IntegerColumn = ${props.filters.IntegerColumn.max}`)).toBeInTheDocument();
  });

  it('should handle missing max in number filter correctly', () => {
    expect.hasAssertions();

    const propsWithMinOnly = {
      ...defaultProps,
      filters: {
        IntegerColumn: { min: '10', max: undefined },
      },
    };

    renderComponent(propsWithMinOnly as unknown as typeof defaultProps);

    expect(screen.getByText(`${propsWithMinOnly.filters.IntegerColumn.min} ≤ IntegerColumn`)).toBeInTheDocument();
  });

  it('should handle missing min in number filter correctly', () => {
    expect.hasAssertions();

    const propsWithMaxOnly = {
      ...defaultProps,
      filters: {
        IntegerColumn: { min: undefined, max: '20' },
      },
    };

    renderComponent(propsWithMaxOnly as unknown as typeof defaultProps);

    expect(screen.getByText(`IntegerColumn ≤ ${propsWithMaxOnly.filters.IntegerColumn.max}`)).toBeInTheDocument();
  });
});
