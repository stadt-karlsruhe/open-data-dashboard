/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { filterAllEntries, filterAllEntriesInvalid } from '~/data/dataFilters';
import { fireEvent, render, screen } from '@testing-library/react';

import AccordionContext from 'react-bootstrap/AccordionContext';
import { ChartTableFilterHeader } from '@/components/visualization/chart-table-filter/ChartTableFilterHeader';
import { Filter } from '@/schemas/configurationSchema';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

jest.mock<typeof import('react-bootstrap/AccordionButton')>('react-bootstrap/AccordionButton', () => {
  const actual = jest.requireActual<typeof import('react-bootstrap/AccordionButton')>(
    'react-bootstrap/AccordionButton',
  );
  return {
    ...actual,
    useAccordionButton: jest.fn(),
  };
});

// eslint-disable-next-line max-lines-per-function
describe('component ChartTableFilterHeader', () => {
  const mockOnChange = jest.fn();
  const mockUseAccordionButton = jest.mocked(useAccordionButton);

  const renderComponent = (activeEventKey?: string, filters: Record<string, Filter> = {}) => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AccordionContext.Provider value={{ activeEventKey }}>
          <ChartTableFilterHeader resourceId="test-resource" filters={filters} eventKey="1" onChange={mockOnChange} />
        </AccordionContext.Provider>
      </NextIntlClientProvider>,
    );
  };

  it('should render correctly with the button in collapsed state', () => {
    expect.hasAssertions();

    renderComponent(undefined, filterAllEntries);

    expect(screen.getByLabelText(messages.ChartTableFilterHead.searchAll)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: messages.ChartTableFilterHead.collapseTooltipExpand }),
    ).toBeInTheDocument();
  });

  it('should correctly handle input change', () => {
    expect.hasAssertions();

    renderComponent(undefined, filterAllEntries);
    const input = screen.getByLabelText(messages.ChartTableFilterHead.searchAll);
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockOnChange).toHaveBeenCalledWith('all-entries', 'test');
  });

  it('should clear the input value when onClear is triggered', () => {
    expect.hasAssertions();

    renderComponent(undefined, filterAllEntries);
    const clearButton = screen.getByRole('button', { name: messages.ClearableInputGroup.clearTooltip });
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith('all-entries', '');
  });

  it('should correctly toggle accordion button', () => {
    expect.hasAssertions();

    const mockDecoratedOnClick = jest.fn();
    mockUseAccordionButton.mockReturnValue(mockDecoratedOnClick);

    renderComponent(undefined, filterAllEntries);

    const button = screen.getByRole('button', { name: messages.ChartTableFilterHead.collapseTooltipExpand });
    fireEvent.click(button);

    expect(mockDecoratedOnClick).toHaveBeenCalledTimes(1);
  });

  it('should show collapse icon and title when activeEventKey matches eventKey', () => {
    expect.hasAssertions();

    renderComponent('1', filterAllEntriesInvalid);

    const button = screen.getByRole('button', { name: messages.ChartTableFilterHead.collapseTooltipCollapse });
    expect(button).toBeInTheDocument();
    expect(button).toContainHTML('<i class="bi bi-caret-up-square"></i>');
  });

  it('should show expand icon and title when activeEventKey does not match eventKey', () => {
    expect.hasAssertions();

    renderComponent('2', filterAllEntries);

    const button = screen.getByRole('button', { name: messages.ChartTableFilterHead.collapseTooltipExpand });
    expect(button).toBeInTheDocument();
    expect(button).toContainHTML('<i class="bi bi-caret-down-square"></i>');
  });
});
