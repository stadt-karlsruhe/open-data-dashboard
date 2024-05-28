// eslint-disable-next-line import/named
import DataTable, { TableStyles } from 'react-data-table-component';
import { colorDark, colorSecondary } from '@/colors';
import { useFormatter, useTranslations } from 'next-intl';

import { TransformedData } from '@/schemas/data-schema';
import { formatNumber } from '@/format';

// Source: https://github.com/jbetancur/react-data-table-component/blob/next/src/DataTable/themes.ts
// Themed to fit Bootstrap 5 look
const fontStyle = {
  fontFamily: 'var(--bs-font-sans-serif)',
  lineHeight: 'var(--bs-body-line-height)',
};
const customStyles: TableStyles = {
  head: {
    style: {
      ...fontStyle,
      color: colorDark,
      fontSize: 'var(--bs-body-font-size)',
      fontWeight: 600,
    },
  },
  rows: {
    style: {
      ...fontStyle,
      fontSize: 'var(--bs-body-font-size)',
      fontWeight: 'var(--bs-body-font-weight)',
      color: colorDark,
    },
  },
  pagination: {
    style: {
      ...fontStyle,
      color: colorSecondary,
      fontSize: '0.9rem',
      fontWeight: 'var(--bs-body-font-weight)',
    },
  },
};

export default function Table({ columnNames, records }: { columnNames: string[]; records: TransformedData[] }) {
  const t = useTranslations('Table');
  const format = useFormatter();
  const columns = columnNames.map((key) => {
    return {
      name: key,
      selector: (row: TransformedData) => row[key],
      format: (row: TransformedData) => formatNumber(row[key], key, format),
      sortable: true,
      reorder: true,
    };
  });

  return (
    <DataTable
      columns={columns}
      data={records as Record<string, never>[]}
      pagination
      paginationComponentOptions={{
        rowsPerPageText: t('rowsPerPageText'),
        rangeSeparatorText: t('rangeSeparatorText'),
        selectAllRowsItem: true,
        selectAllRowsItemText: t('selectAllRowsItemText'),
      }}
      striped
      highlightOnHover
      customStyles={customStyles}
    />
  );
}
