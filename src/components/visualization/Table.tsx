// eslint-disable-next-line import/named
import DataTable, { TableStyles } from 'react-data-table-component';
import { DataRecord } from '@/types/visualization';
import { useTranslations } from 'next-intl';

// Source: https://github.com/jbetancur/react-data-table-component/blob/next/src/DataTable/themes.ts
// Themed to fit Bootstrap 5 look
const fontStyle = {
  fontFamily: 'var(--bs-font-sans-serif)',
  lineHeight: 1.5,
};
const customStyles: TableStyles = {
  head: {
    style: {
      ...fontStyle,
      color: 'var(--bs-dark)',
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  rows: {
    style: {
      ...fontStyle,
      fontSize: '1rem',
      fontWeight: 400,
      color: 'var(--bs-dark)',
    },
  },
  pagination: {
    style: {
      ...fontStyle,
      color: 'var(--bs-secondary)',
      fontSize: '0.9rem',
      fontWeight: 400,
    },
  },
};

export default function Table({ columnNames, records }: { columnNames: string[]; records: DataRecord }) {
  const t = useTranslations('Table');
  const columns = columnNames.map((key) => {
    return {
      name: key,
      selector: (row: Record<string, never>) => row[key],
      sortable: true,
      reorder: true,
    };
  });

  return (
    <DataTable
      columns={columns}
      data={records}
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
