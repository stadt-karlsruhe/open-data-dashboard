/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import CurrentFilters from '@/components/visualization/chart-table-filter/CurrentFilters';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';

const defaultProps = {
  filters: {
    textKey: 'text filter',
    numberKey: { min: '10', max: '20' },
    'all-entries': 'test filter',
  },
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
      `${messages.CurrentFilters.allEntriesLabel} ${messages.CurrentFilters.contains} "test filter"`,
    );
    const textFilter = screen.getByText(`textKey ${messages.CurrentFilters.contains} "text filter"`);

    expect(allEntriesFilter).toBeInTheDocument();
    expect(textFilter).toBeInTheDocument();
    // allEntriesFilter should be rendered before textFilter
    expect(allEntriesFilter.compareDocumentPosition(textFilter)).toBe(4);
  });

  it('should render number filters correctly', () => {
    expect.hasAssertions();

    renderComponent(defaultProps);

    expect(screen.getByText('10 ≤ numberKey ≤ 20')).toBeInTheDocument();
  });

  it('should call onClear when clear button is clicked', () => {
    expect.hasAssertions();

    renderComponent(defaultProps);
    const clearButtonAllEntries = screen.getByRole('button', {
      name: `${messages.CurrentFilters.allEntriesLabel} ${messages.CurrentFilters.contains} "test filter"`,
    });
    const clearButtonTextFilter = screen.getByRole('button', {
      name: `textKey ${messages.CurrentFilters.contains} "text filter"`,
    });
    const clearButtonNumberFilter = screen.getByRole('button', { name: '10 ≤ numberKey ≤ 20' });
    fireEvent.click(clearButtonAllEntries);
    fireEvent.click(clearButtonTextFilter);
    fireEvent.click(clearButtonNumberFilter);

    expect(defaultProps.onClear).toHaveBeenCalledTimes(3);
    expect(defaultProps.onClear).toHaveBeenCalledWith('all-entries', '');
    expect(defaultProps.onClear).toHaveBeenCalledWith('textKey', '');
    expect(defaultProps.onClear).toHaveBeenCalledWith('numberKey', '');
  });

  it('should handle equal min and max in number filter correctly', () => {
    expect.hasAssertions();

    const props = {
      ...defaultProps,
      filters: {
        numberKey: { min: '15', max: '15' },
      },
    };

    renderComponent(props as typeof defaultProps);

    expect(screen.getByText('numberKey = 15')).toBeInTheDocument();
  });

  it('should handle missing max in number filter correctly', () => {
    expect.hasAssertions();

    const propsWithMinOnly = {
      ...defaultProps,
      filters: {
        numberKey: { min: '10' },
      },
    };

    renderComponent(propsWithMinOnly as typeof defaultProps);

    expect(screen.getByText('10 ≤ numberKey')).toBeInTheDocument();
  });

  it('should handle missing min in number filter correctly', () => {
    expect.hasAssertions();

    const propsWithMaxOnly = {
      ...defaultProps,
      filters: {
        numberKey: { max: '20' },
      },
    };

    renderComponent(propsWithMaxOnly as typeof defaultProps);

    expect(screen.getByText('numberKey ≤ 20')).toBeInTheDocument();
  });
});
