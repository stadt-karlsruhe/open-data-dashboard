/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import EmbedModal from '@/components/dashboard-resource/EmbedModal';
import { NextIntlClientProvider } from 'next-intl';
import { jsonResource } from '~/data/resources';
import messages from '@/messages/en.json';
import { mockConfiguration } from '~/data/configurations';

describe('component EmbedModal', () => {
  it('should render the modal for resources when show is true', async () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <EmbedModal element={jsonResource} show setShow={jest.fn()} type="resource" />
      </NextIntlClientProvider>,
    );

    // eslint-disable-next-line require-await, @typescript-eslint/require-await
    await act(async () => {
      expect(screen.getByText(messages.EmbedModal.resourceTitle)).toBeInTheDocument();
      expect(screen.getByText(messages.EmbedModal.resourceBody)).toBeInTheDocument();
    });
  });

  it('should render the modal for dashboards when show is true', async () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <EmbedModal element={mockConfiguration.dashboards[1]} show setShow={jest.fn()} type="dashboard" />
      </NextIntlClientProvider>,
    );

    // eslint-disable-next-line require-await, @typescript-eslint/require-await
    await act(async () => {
      expect(screen.getByText(messages.EmbedModal.dashboardTitle)).toBeInTheDocument();
      expect(screen.getByText(messages.EmbedModal.dashboardBody)).toBeInTheDocument();
    });
  });

  it('should hide the modal when show is false', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <EmbedModal element={jsonResource} show={false} setShow={jest.fn()} type="resource" />
      </NextIntlClientProvider>,
    );

    expect(screen.queryByText(messages.EmbedModal.resourceTitle)).not.toBeInTheDocument();
  });
});
