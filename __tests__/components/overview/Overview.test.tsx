/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { DataElement } from '@/types/data';
import { NextIntlClientProvider } from 'next-intl';
import Overview from '@/components/overview/Overview';
import messages from '@/messages/en.json';
import { mockDataElements } from '~/data/dataElements';

describe('component Overview', () => {
  it('should render no records when content is empty', async () => {
    expect.hasAssertions();
    // eslint-disable-next-line require-await, @typescript-eslint/require-await
    await act(async () => {
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <Overview content={[]} />
        </NextIntlClientProvider>,
      );
    });
    expect(screen.getByText(messages.Table.noRecords)).toBeInTheDocument();
  });

  it('should render data elements when content is provided', async () => {
    expect.hasAssertions();
    // eslint-disable-next-line require-await, @typescript-eslint/require-await
    await act(async () => {
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <Overview content={mockDataElements as DataElement[]} />
        </NextIntlClientProvider>,
      );
    });

    expect(screen.getByText(mockDataElements[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockDataElements[0].description)).toBeInTheDocument();
    expect(screen.getByText(mockDataElements[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockDataElements[1].description)).toBeInTheDocument();
  });
});
