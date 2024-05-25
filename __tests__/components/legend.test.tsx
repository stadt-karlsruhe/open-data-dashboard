/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Legend from '@/components/visualization/map/Legend';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';
import { standardLabels } from '../data/dataLabels';

describe('component ChartTableFilterBody', () => {
  const renderComponent = () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Legend labels={standardLabels} />
      </NextIntlClientProvider>,
    );
  };

  it('should render correctly', () => {
    expect.hasAssertions();

    renderComponent();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(screen.getByText('Kinos')).toBeInTheDocument();
  });
});
