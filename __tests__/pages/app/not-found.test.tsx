/**
 * @jest-environment jsdom
 */

import { describe, expect, it, jest } from '@jest/globals';
import { redirect, usePathname } from 'next/navigation';

import NotFound from '@/app/not-found';
import { render } from '@testing-library/react';

const mockPathname = usePathname as jest.Mocked<typeof usePathname>;

describe('root not-found page', () => {
  it('should redirect to the localized path (default locale) if not locale was provided', () => {
    expect.hasAssertions();

    mockPathname.mockReturnValueOnce('/home');

    // @ts-expect-error Page is a valid Next.js component
    render(<NotFound />);
    expect(redirect).toHaveBeenCalledWith('/en/home');
  });

  it('should redirect to the path with an existent locale if the provided locale is not supported', () => {
    expect.hasAssertions();

    mockPathname.mockReturnValueOnce('/es/home');

    // @ts-expect-error Page is a valid Next.js component
    render(<NotFound />);
    expect(redirect).toHaveBeenCalledWith('/en/home');
  });

  it('should redirect to root if the provided path is localized and the locale exists', () => {
    expect.hasAssertions();

    mockPathname.mockReturnValueOnce('/en/home');

    // @ts-expect-error Page is a valid Next.js component
    render(<NotFound />);
    expect(redirect).toHaveBeenCalledWith('/');
  });
});
