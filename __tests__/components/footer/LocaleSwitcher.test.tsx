/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';

import LocaleSwitcher from '@/components/footer/LocaleSwitcher';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/locales';
import messages from '@/messages/en.json';
import { useRouter } from 'next/navigation';

describe('component LocaleSwitcher', () => {
  it('should render the select element with the current locale', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>,
    );

    const select = screen.getByLabelText('locale-switcher');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('en');
  });

  it('should render the correct options for each locale', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>,
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(locales.size);

    const localeValues = [...locales.values()];
    options.forEach((option, index) => {
      expect(option).toHaveValue(localeValues[index]);
    });
  });

  it('changes the locale when a new option is selected', () => {
    expect.hasAssertions();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>,
    );

    const select = screen.getByLabelText('locale-switcher');
    fireEvent.change(select, { target: { value: 'de' } });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(useRouter().replace).toHaveBeenCalledTimes(1);
  });
});
