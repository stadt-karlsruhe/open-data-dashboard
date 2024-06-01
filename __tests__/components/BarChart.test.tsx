/**
 * @jest-environment jsdom
 */
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import BarChart from '@/components/visualization/bar-chart/BarChart';
import { NextIntlClientProvider } from 'next-intl';
import { jsonResourceWithChart } from '../data/resources';
import { jsonStandard } from '../data/dataFormats';
import messages from '@/messages/en.json';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual<typeof import('recharts')>('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children, aspect }: { children: never; aspect: number }) => (
      <OriginalModule.ResponsiveContainer width={800} aspect={aspect}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe('component BarChart', () => {
  it('should render all chart components, correct domain and y-axes', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <BarChart
          data={jsonStandard}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          axisPairs={jsonResourceWithChart.visualizations.barChart!.axisPairs}
          aspect={1}
        />
      </NextIntlClientProvider>,
    );

    Object.keys(jsonStandard[0])
      .filter((key) => key !== 'BooleanColumn')
      .forEach((key) => {
        expect(screen.getByText(key)).toBeInTheDocument();
      });
  });
});
