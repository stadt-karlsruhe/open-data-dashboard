/**
 * @jest-environment jsdom
 */
import { describe, expect, it, jest } from '@jest/globals';
import { DataRecord } from '@/types/visualization';
import { NextIntlClientProvider } from 'next-intl';
import Table from '@/components/visualization/Table';
import { jsonStandard } from '../data/data-formats';
import messages from '@/messages/en.json';
import { render } from '@testing-library/react';

// TODO: Investigate why the table is not displaying data of type boolean
const testData = jsonStandard.map(({ BooleanColumn, ...rest }) => rest);
const columnNames = Object.keys(testData[0]);

describe('component Table', () => {
  it('should render table with correct column names and records', () => {
    expect.hasAssertions();
    const { getByText } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Table columnNames={columnNames} records={testData as unknown as DataRecord} />
      </NextIntlClientProvider>,
    );

    columnNames.forEach((columnName) => {
      expect(getByText(columnName)).toBeVisible();
    });

    testData.forEach((record) => {
      Object.values(record).forEach((value) => {
        expect(getByText(String(value))).toBeVisible();
      });
    });
  });
});
