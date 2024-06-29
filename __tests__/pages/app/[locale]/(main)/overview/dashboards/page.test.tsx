/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { NextIntlClientProvider } from 'next-intl';
import Page from '@/app/[locale]/(main)/overview/dashboards/page';
import { getValidatedConfiguration } from '@/schemas/validate';
import messages from '@/messages/en.json';
import { mockConfiguration } from '~/data/configurations';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(() => Promise.resolve((key: string) => `Mocked translation for ${key}`)),
}));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/overview/Overview', () => jest.fn(() => <div>Mocked Overview</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/error-handling/ErrorComponent', () => jest.fn(() => <div>Mocked ErrorComponent</div>));
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/schemas/validate', () => {
  return {
    getValidatedData: jest.fn(),
    getValidatedConfiguration: jest.fn(),
  };
});

describe('dashboards overview page', () => {
  it('should render the Overview component', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: true, configuration: mockConfiguration, error: undefined });
    const PageComponent = await Page();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {PageComponent}
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('Mocked Overview')).toBeInTheDocument();
  });

  it('should render the ErrorComponent if configuration returned errors', async () => {
    expect.hasAssertions();

    jest
      .mocked(getValidatedConfiguration)
      .mockResolvedValueOnce({ success: false, configuration: undefined, error: 'error' });
    const PageComponent = await Page();

    render(PageComponent);

    expect(screen.getByText('Mocked ErrorComponent')).toBeInTheDocument();
  });
});
