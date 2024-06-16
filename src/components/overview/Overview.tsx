'use client';

import { DataElement } from '@/types/data';
// eslint-disable-next-line import/named
import { TableColumn } from 'react-data-table-component';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import dynamic from 'next/dynamic';
import { getColorForResourceType } from '@/utils/colors';
import { locales } from '@/locales';
import { useTranslations } from 'next-intl';

// Avoid hydration error inside Table pagination https://stackoverflow.com/questions/77763766/next-js-hydration-error-with-shadcn-dialog-component
const DataTable = dynamic(() => import('react-data-table-component'), { ssr: false });

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function Overview({ content }: { content: DataElement[] }) {
  const tableT = useTranslations('Table');
  const columns = [
    {
      cell: (row: DataElement) => transformContentToHTMLElement(row),
    },
  ] as TableColumn<unknown>[];
  return (
    <DataTable
      dense={true}
      columns={columns}
      data={content}
      noDataComponent={tableT('noRecords')}
      highlightOnHover
      pagination={content.length > 10}
      paginationComponentOptions={{
        rowsPerPageText: tableT('rowsPerPageText'),
        rangeSeparatorText: tableT('rangeSeparatorText'),
        selectAllRowsItem: true,
        selectAllRowsItemText: tableT('selectAllRowsItemText'),
      }}
    />
  );
}

function transformContentToHTMLElement(element: DataElement) {
  const badgeColor = getColorForResourceType(element.resourceType);
  const titleColor = element.type === 'category' ? 'var(--bs-green)' : '';
  return (
    <Link href={element.href} className="d-flex align-items-center text-dark text-decoration-none w-100 p-2">
      <i className={`bi bi-${element.icon} fs-1 me-3`} style={{ color: titleColor }} />
      <div>
        <div className={`fs-5`} style={{ color: titleColor }}>
          {element.name}
        </div>
        <br />
        <div className="fs-6">{element.description}</div>
        {element.type !== 'category' && element.type !== 'dashboard' && (
          <span className="badge my-1" style={{ backgroundColor: badgeColor }}>
            {element.resourceType}
          </span>
        )}
      </div>
    </Link>
  );
}
