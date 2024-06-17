/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';

import { ChartTableFilterBody } from '@/components/visualization/chart-table-filter/ChartTableFilterBody';
import { NextIntlClientProvider } from 'next-intl';
import { filterMixed } from '~/data/dataFilters';
import { jsonStandard } from '~/data/dataFormats';
import messages from '@/messages/en.json';

// eslint-disable-next-line max-lines-per-function
describe('component ChartTableFilterBody', () => {
  const mockOnChange = jest.fn();
  const mockOnClearAll = jest.fn();

  const renderComponent = () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChartTableFilterBody
          resourceId="test-resource"
          filters={filterMixed}
          records={jsonStandard[0] as unknown as Record<string, never>}
          eventKey="1"
          onChange={mockOnChange}
          onClearAll={mockOnClearAll}
        />
      </NextIntlClientProvider>,
    );
  };

  it('should render correctly', () => {
    expect.hasAssertions();

    renderComponent();

    expect(screen.getByText('StringColumn')).toBeInTheDocument();
    expect(screen.getByText('IntegerColumn')).toBeInTheDocument();
  });

  it('should correctly handle input changes', () => {
    expect.hasAssertions();

    renderComponent();
    const [input] = screen.getAllByLabelText(messages.ChartTableFilterBody.filter);
    const [minInput] = screen.getAllByLabelText('Min');
    const [maxInput] = screen.getAllByLabelText('Max');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(minInput, { target: { value: 2 } });
    fireEvent.change(maxInput, { target: { value: 10 } });

    expect(mockOnChange).toHaveBeenCalledWith('StringColumn', 'test');
    expect(mockOnChange).toHaveBeenCalledWith('IntegerColumn', { min: '2', max: filterMixed.IntegerColumn.max });
    expect(mockOnChange).toHaveBeenCalledWith('IntegerColumn', { min: filterMixed.IntegerColumn.min, max: '10' });
    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });

  it('should clear the input values when onClear is triggered', () => {
    expect.hasAssertions();

    renderComponent();
    const [clearButtonStringColumn, clearButtonIntegerColumnMin, clearButtonIntegerColumnMax] = screen.getAllByRole(
      'button',
      {
        name: messages.ClearableInputGroup.clearTooltip,
      },
    );
    fireEvent.click(clearButtonStringColumn);
    fireEvent.click(clearButtonIntegerColumnMin);
    fireEvent.click(clearButtonIntegerColumnMax);

    expect(mockOnChange).toHaveBeenCalledWith('StringColumn', '');
    expect(mockOnChange).toHaveBeenCalledWith('IntegerColumn', { max: filterMixed.IntegerColumn.max });
    expect(mockOnChange).toHaveBeenCalledWith('IntegerColumn', { min: filterMixed.IntegerColumn.min });
    expect(mockOnChange).toHaveBeenCalledTimes(6);
  });
});
