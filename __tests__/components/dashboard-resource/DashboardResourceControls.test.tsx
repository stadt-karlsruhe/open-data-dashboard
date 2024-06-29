/**
 * @jest-environment jsdom
 */

import { describe, expect, it, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import DashboardResourceControls from '@/components/dashboard-resource/DashboardResourceControls';
import { NextIntlClientProvider } from 'next-intl';
import { jsonResource } from '~/data/resources';
import messages from '@/messages/en.json';
import { mockConfiguration } from '~/data/configurations';

jest.mock<typeof import('@/components/dashboard-resource/EmbedModal')>(
  '@/components/dashboard-resource/EmbedModal',
  () => ({
    __esModule: true,
    default: () => <div>Mocked EmbedModal</div>,
  }),
);

describe('component DashboardResourceControls', () => {
  it('should render correct content for controls of type dashboard', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DashboardResourceControls type="dashboard" element={mockConfiguration.dashboards[1]} />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(messages.DashboardResourceControls.fullscreen)).toBeInTheDocument();
    expect(screen.queryByText(messages.DashboardResourceControls.download)).not.toBeInTheDocument();
    expect(screen.getByText('Mocked EmbedModal')).toBeInTheDocument();
  });

  it('should render correct content for controls of type resource', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DashboardResourceControls type="resource" element={jsonResource} />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(messages.DashboardResourceControls.fullscreen)).toBeInTheDocument();
    expect(screen.getByText(messages.DashboardResourceControls.download)).toBeInTheDocument();
    expect(screen.getByText('Mocked EmbedModal')).toBeInTheDocument();
  });
});
