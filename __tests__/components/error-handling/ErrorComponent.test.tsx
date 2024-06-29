/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';

// eslint-disable-next-line max-lines-per-function
describe('component ErrorComponent', () => {
  it('should render notFound error correctly', () => {
    expect.hasAssertions();
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ErrorComponent type="notFound" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(messages.Error.notFoundTitle)).toBeInTheDocument();
    expect(screen.getByText(messages.Error.notFoundSubtitle)).toBeInTheDocument();
    expect(screen.getByText(messages.Error.returnBtn)).toBeInTheDocument();
    expect(screen.getAllByText('4')[0]).toBeInTheDocument();
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should render dataEmpty error correctly', () => {
    expect.hasAssertions();
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ErrorComponent type="dataEmpty" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(messages.Error.dataEmptyTitle)).toBeInTheDocument();
    expect(screen.getByText(messages.Error.returnBtn)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });

  it('should render dataNotLoaded error correctly', () => {
    expect.hasAssertions();
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ErrorComponent type="dataNotLoaded" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(messages.Error.dataNotLoadedTitle)).toBeInTheDocument();
    expect(screen.getByText(messages.Error.returnBtn)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });

  it('should render configurationError error correctly', () => {
    expect.hasAssertions();
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ErrorComponent type="configurationError" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(messages.Error.configurationErrorTitle)).toBeInTheDocument();
    expect(screen.getByText(messages.Error.returnBtn)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });

  it('should render unexpected error correctly', () => {
    expect.hasAssertions();
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ErrorComponent type="unexpected" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(messages.Error.unexpectedTitle)).toBeInTheDocument();
    expect(screen.getByText(messages.Error.returnBtn)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });
});
