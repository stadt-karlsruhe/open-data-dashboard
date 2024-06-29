/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { DataElement } from '@/types/data';
import InternalLinkContent from '@/components/dashboard-resource/dashboard/InternalLinkContent';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';
import { mockDataElements } from '~/data/dataElements';
import { mockInternalLinkContentResource } from '~/data/dashboardContents';

describe('component InternalLinkContent', () => {
  it('should render with correct content', () => {
    expect.hasAssertions();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <InternalLinkContent element={mockDataElements[0] as DataElement} content={mockInternalLinkContentResource} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(mockDataElements[0].name)).toBeInTheDocument();
  });
});
