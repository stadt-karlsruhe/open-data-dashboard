/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Header from '@/components/header/Header';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';
import { mockConfiguration } from '~/data/configurations';
import { usePathname } from 'next/navigation';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/search/Search', () => jest.fn(() => <div>Mocked Search</div>));

const mockPathname = jest.mocked(usePathname);

describe('component Header', () => {
  it('should render the header with title link and logos', () => {
    expect.hasAssertions();
    mockPathname.mockReturnValueOnce('/home');
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header configuration={mockConfiguration} />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(messages.Header.title)).toBeInTheDocument();
    expect(screen.getByAltText('LogoKarlsruheSmall')).toBeInTheDocument();
    expect(screen.getByAltText('LogoKarlsruhe')).toBeInTheDocument();
  });

  it('should not render the search on the homepage', () => {
    expect.hasAssertions();
    mockPathname.mockReturnValueOnce('/home');
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header configuration={mockConfiguration} />
      </NextIntlClientProvider>,
    );
    expect(screen.queryByText('Mocked Search')).not.toBeInTheDocument();
  });

  it('should render the search when not on the homepage', () => {
    expect.hasAssertions();
    mockPathname.mockReturnValueOnce('/overview');
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header configuration={mockConfiguration} />
      </NextIntlClientProvider>,
    );
    expect(screen.getAllByText('Mocked Search')[0]).toBeInTheDocument();
  });
});
