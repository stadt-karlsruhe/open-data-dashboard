// eslint-disable-next-line import/named
import DataTable, { Alignment, TableStyles } from 'react-data-table-component';
import { DataRecord } from '@/types/visualization';
import { useState } from 'react';

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

// eslint-disable-next-line max-lines-per-function
export default function Table({ record }: { record: DataRecord }) {
  const [filterText, setFilterText] = useState('');
  if (record.length === 0) {
    return <></>;
  }

  const columns = Object.keys(record[0]).map((key, index) => {
    return {
      id: index,
      name: key,
      selector: (row: Record<string, never>) => row[key],
      sortable: true,
      reorder: true,
    };
  });

  const filteredRecords =
    filterText === ''
      ? record
      : record.filter((obj) => Object.values(obj).some((value) => String(value).includes(filterText)));

  const onClear = () => {
    if (filterText !== '') {
      setFilterText('');
    }
  };
  const SubHeaderComponent = () => {
    return (
      <div className="input-group" style={{ maxWidth: '50%' }}>
        <input
          type="text"
          placeholder="Filter"
          aria-label="Filter"
          className="form-control rounded-0"
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
        />
        <button className="btn-primary px-2 rounded-0" onClick={onClear}>
          ✖
        </button>
      </div>
    );
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredRecords}
        pagination
        paginationComponentOptions={{ selectAllRowsItem: true }}
        striped
        highlightOnHover
        subHeader
        subHeaderComponent={SubHeaderComponent()}
        subHeaderAlign={Alignment.CENTER}
        customStyles={customStyles}
      />
    </div>
  );
}
