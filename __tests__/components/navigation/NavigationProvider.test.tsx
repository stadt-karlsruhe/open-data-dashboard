/**
 * @jest-environment jsdom
 */

import NavigationProvider, { useShowNavigation } from '@/components/navigation/NavigationProvider';
import React, { ReactNode } from 'react';
import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';

// Create a test component to use the context
const TestComponent = () => {
  const { show, setShow } = useShowNavigation();
  return (
    <div>
      <p>{show ? 'Visible' : 'Hidden'}</p>
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        Toggle
      </button>
    </div>
  );
};

describe('component NavigationProvider', () => {
  it('should provide the correct default value', () => {
    expect.hasAssertions();
    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>,
    );

    expect(screen.getByText('Hidden')).toBeInTheDocument();
  });

  it('should update the context value when setShow is called', () => {
    expect.hasAssertions();
    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>,
    );

    const button = screen.getByRole('button', { name: /toggle/iu });
    fireEvent.click(button);

    expect(screen.getByText('Visible')).toBeInTheDocument();
  });
});
