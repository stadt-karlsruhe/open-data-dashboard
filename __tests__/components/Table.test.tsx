/**
 * @jest-environment jsdom
 */
import { describe, expect, it } from '@jest/globals';
// TODO: Investigate why the table is not displaying data of type boolean
import { jsonStandard, jsonStandardFormattedEn } from '../data/dataFormats';

import { NextIntlClientProvider } from 'next-intl';
import Table from '@/components/visualization/Table';
import { TransformedData } from '@/schemas/data-schema';
import messages from '@/messages/en.json';
import { render } from '@testing-library/react';

const columnNames = Object.keys(jsonStandard[0]);

describe('component Table', () => {
  it('should render table with correct column names and records', () => {
    expect.hasAssertions();
    const { getByText } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Table columnNames={columnNames} records={jsonStandard as TransformedData[]} />
      </NextIntlClientProvider>,
    );

    columnNames.forEach((columnName) => {
      expect(getByText(columnName)).toBeVisible();
    });

    jsonStandardFormattedEn.forEach((record) => {
      Object.values(record).forEach((value) => {
        expect(getByText(String(value))).toBeVisible();
      });
    });
  });
});
