/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import LegalNotice from '@/components/legal-notice/LegalNotice';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';

describe('component LegalNotice', () => {
  it('should render titles and content', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LegalNotice />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(messages.LegalNotice.publisher)).toBeInTheDocument();
    expect(screen.getByText(messages.LegalNotice.responsibleEditorialDepartment)).toBeInTheDocument();
    expect(screen.getByText(messages.LegalNotice.dataProtection)).toBeInTheDocument();
  });

  it('should render correct external link', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LegalNotice />
      </NextIntlClientProvider>,
    );

    const externalLink = screen.getByText(messages.LegalNotice.awp);
    expect(externalLink).toBeInTheDocument();
    expect(externalLink).toHaveAttribute('href', 'https://www.h-ka.de/');
    expect(externalLink).toHaveAttribute('target', '_blank');
  });

  it('should render team members', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LegalNotice />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('Chiara Scheurer')).toBeInTheDocument();
    expect(screen.getByText('Abdullah Atak')).toBeInTheDocument();
    expect(screen.getByText('Christian Holst')).toBeInTheDocument();
    expect(screen.getByText('Jan Kuhnmünch')).toBeInTheDocument();
    expect(screen.getByText('Daniel Purtov')).toBeInTheDocument();
  });
});
