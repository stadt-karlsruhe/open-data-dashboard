/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import useWindowDimensions from '@/components/helper/WindowDimensions';

describe('useWindowDimensions', () => {
  it('should return the correct window dimensions', () => {
    expect.hasAssertions();

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });

    const { result } = renderHook(() => useWindowDimensions());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('should update the dimensions on window resize', () => {
    expect.hasAssertions();

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });

    const { result } = renderHook(() => useWindowDimensions());

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(1280);
    expect(result.current.height).toBe(800);
  });
});
