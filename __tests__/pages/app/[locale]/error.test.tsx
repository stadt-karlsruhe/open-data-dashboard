/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import ErrorPage from '@/app/[locale]/error';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/error-handling/ErrorComponent', () => jest.fn(() => <div>Mocked ErrorComponent</div>));

describe('localized error page', () => {
  it('should render the ErrorComponent component', () => {
    expect.hasAssertions();

    render(<ErrorPage error={new Error('error')} />);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });
});
