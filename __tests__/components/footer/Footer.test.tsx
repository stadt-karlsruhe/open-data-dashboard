/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Footer from '@/components/footer/Footer';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/footer/LocaleSwitcher', () => jest.fn(() => <div>Mocked LocaleSwitcher</div>));

describe('component Footer', () => {
  it('should render the LocaleSwitcher and two links', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('Mocked LocaleSwitcher')).toBeInTheDocument();

    const legalNoticeLink = screen.getByText(messages.Footer.legalNotice);
    expect(legalNoticeLink).toBeInTheDocument();
    expect(legalNoticeLink).toHaveAttribute('href', '/en/legal-notice');

    const sourceLink = screen.getByText(messages.Footer.source);
    expect(sourceLink).toBeInTheDocument();
    expect(sourceLink).toHaveAttribute('href', 'https://github.com/stadt-karlsruhe/open-data-dashboard');
  });
});
