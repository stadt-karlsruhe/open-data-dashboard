/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { NextIntlClientProvider } from 'next-intl';
import Page from '@/app/[locale]/(main)/legal-notice/page';
import messages from '@/messages/en.json';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/legal-notice/LegalNotice', () => jest.fn(() => <div>Mocked LegalNotice</div>));

describe('legal-notice page', () => {
  it('should render the LegalNotice component', () => {
    expect.hasAssertions();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Page />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('Mocked LegalNotice')).toBeInTheDocument();
  });
});
