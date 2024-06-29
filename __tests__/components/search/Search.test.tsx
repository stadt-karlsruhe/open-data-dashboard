/**
 * @jest-environment jsdom
 */

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { NextIntlClientProvider } from 'next-intl';
import Search from '@/components/search/Search';
import messages from '@/messages/en.json';
import { mockConfiguration } from '~/data/configurations';

describe('component Search', () => {
  it('should render', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Search configuration={mockConfiguration} id="search-test" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByPlaceholderText(messages.Search.search)).toBeInTheDocument();
  });

  it('should handle input change and display search results', async () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Search configuration={mockConfiguration} id="search-test" />
      </NextIntlClientProvider>,
    );
    const input = screen.getByRole('combobox');
    act(() => {
      fireEvent.change(input, { target: { value: 'Gesellschaft' } });
    });

    await waitFor(() => {
      expect(screen.getAllByText('Gesellschaft')[0]).toBeInTheDocument();
    });
  });

  it('should navigate on enter key when an item is selected', async () => {
    expect.hasAssertions();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Search configuration={mockConfiguration} id="search-test" />
      </NextIntlClientProvider>,
    );

    const input = screen.getByRole('combobox');
    act(() => {
      fireEvent.change(input, { target: { value: 'Gesellschaft' } });
    });
    await waitFor(() => {
      const [, secondResult] = screen.getAllByText('Gesellschaft');
      fireEvent.click(secondResult);
    });
    act(() => {
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    });

    // Searchbox is cleared once the search was executed
    expect(screen.queryByText('Gesellschaft')).not.toBeInTheDocument();
  });
});
