/**
 * @jest-environment jsdom
 */

import { describe, expect, it, jest } from '@jest/globals';
import { redirect, usePathname } from 'next/navigation';

import Page from '@/app/[locale]/(main)/page';
import { render } from '@testing-library/react';

const mockPathname = usePathname as jest.Mocked<typeof usePathname>;

describe('root page', () => {
  it('redirects to the "/home" path appended to current pathname', () => {
    expect.hasAssertions();

    mockPathname.mockReturnValueOnce('');

    // @ts-expect-error Page is a valid Next.js component
    render(<Page />);
    expect(redirect).toHaveBeenCalledWith('/home');
  });
});
