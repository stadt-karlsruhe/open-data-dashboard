/**
 * @jest-environment jsdom
 */

import NavigationProvider, { useShowNavigation } from '@/components/navigation/NavigationProvider';
import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';

import Navigation from '@/components/navigation/Navigation';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';
import { mockConfiguration } from '~/data/configurations';

function NavigationController() {
  const { setShow } = useShowNavigation();
  return (
    <button
      onClick={() => {
        setShow(true);
      }}
      data-testid="open-nav"
    >
      Open Navigation
    </button>
  );
}

describe('component Navigation', () => {
  it('should render the offcanvas and navigation content correctly', () => {
    expect.hasAssertions();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: unknown) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NavigationProvider>
          <NavigationController />
          <Navigation configuration={mockConfiguration} />
        </NavigationProvider>
      </NextIntlClientProvider>,
    );

    // Initially, Offcanvas should not be visible
    expect(screen.queryByText('Open Data Dashboard')).not.toBeInTheDocument();

    // Simulate opening navigation
    fireEvent.click(screen.getByTestId('open-nav'));
    expect(screen.getByText('Open Data Dashboard')).toBeInTheDocument();

    expect(screen.getAllByText('Gesellschaft')[0]).toBeInTheDocument();
    expect(screen.getAllByText('FirstDashboard')[0]).toBeInTheDocument();
  });
});
