/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import NotFound from '@/app/[locale]/not-found';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/error-handling/ErrorComponent', () => jest.fn(() => <div>Mocked ErrorComponent</div>));

describe('localized not-found page', () => {
  it('should render the ErrorComponent component', () => {
    expect.hasAssertions();

    render(<NotFound />);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });
});
