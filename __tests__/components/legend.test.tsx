/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Legend from '@/components/visualization/map/Legend';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';
import { standardLabels } from '../data/mapComponentData';

describe('component Legend', () => {
  const renderComponent = () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Legend labels={standardLabels} />
      </NextIntlClientProvider>,
    );
  };

  it('should render labels correctly', () => {
    expect.hasAssertions();

    renderComponent();

    expect(screen.getByText('Kinos')).toBeInTheDocument();
    expect(screen.getByText('Museen')).toBeInTheDocument();
  });
  it('should render colors correctly', () => {
    expect.hasAssertions();

    renderComponent();

    const divElements = screen.getAllByRole('generic', { hidden: true });
    expect(divElements.some((div) => div.classList.contains('bi-circle-fill'))).toBe(true);
    expect(divElements.some((div) => div.style.color === 'rgb(255, 255, 255)')).toBe(true);
    expect(divElements.some((div) => div.style.color === 'rgb(0, 0, 0)')).toBe(true);
  });
});
