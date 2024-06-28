/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import ExternalLinkContent from '@/components/dashboard-resource/dashboard/ExternalLinkContent';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';
import { mockExternalLinkContent } from '~/data/dashboardContents';

describe('component ExternalLinkContent', () => {
  it('should render with correct content', () => {
    expect.hasAssertions();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ExternalLinkContent content={mockExternalLinkContent} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(mockExternalLinkContent.text)).toBeInTheDocument();
  });
});
