// eslint-disable-next-line import/named
import DataTable, { TableStyles } from 'react-data-table-component';
import { DataRecord } from '@/types/visualization';

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
      color: '#212529',
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  rows: {
    style: {
      ...fontStyle,
      fontSize: '1rem',
      fontWeight: 400,
      color: '#212529',
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
  const columns = columnNames.map((key) => {
    return {
      name: key,
      selector: (row: Record<string, never>) => row[key],
      sortable: true,
      reorder: true,
    };
  });

  return (
    <div>
      <DataTable
        columns={columns}
        data={records}
        pagination
        paginationComponentOptions={{ selectAllRowsItem: true }}
        striped
        highlightOnHover
        subHeader
        customStyles={customStyles}
      />
    </div>
  );
}
