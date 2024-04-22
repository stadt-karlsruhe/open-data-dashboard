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

const allFields = 'ALL';

// eslint-disable-next-line max-lines-per-function
export default function Table({ record }: { record: DataRecord }) {
  const [filterText, setFilterText] = useState('');
  const [selectedFields, setSelectedFields] = useState(allFields);
  if (record.length === 0) {
    return <></>;
  }

  const columns = Object.keys(record[0]).map((key) => {
    return {
      name: key,
      selector: (row: Record<string, never>) => row[key],
      sortable: true,
      reorder: true,
    };
  });

  const filteredRecords =
    filterText === ''
      ? record
      : record.filter((obj) => {
          if (selectedFields === allFields) {
            return Object.values(obj).some((value) => String(value).includes(filterText));
          }
          return String(obj[selectedFields]).includes(filterText);
        });

  const onClear = () => {
    if (filterText !== '') {
      setFilterText('');
    }
    setSelectedFields(allFields);
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
        <select
          style={{ maxWidth: '30%' }}
          value={selectedFields}
          onChange={(e) => {
            setSelectedFields(e.target.value);
          }}
          className="form-select"
          aria-label="Filter By"
        >
          <option value={allFields} selected></option>
          {Object.keys(record[0]).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
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
