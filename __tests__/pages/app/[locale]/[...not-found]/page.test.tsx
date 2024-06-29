/**
 * @jest-environment jsdom
 */

import { describe, expect, it, jest } from '@jest/globals';

import Page from '@/app/[locale]/[...not-found]/page';
import { notFound } from 'next/navigation';
import { render } from '@testing-library/react';

describe('not-found page', () => {
  it('should call notFound()', () => {
    expect.hasAssertions();

    // @ts-expect-error Page is a valid Next.js component
    render(<Page />);
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
