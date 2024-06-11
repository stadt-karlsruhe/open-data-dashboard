'use client';

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

export interface OverviewRow {
  title: string;
  description?: string;
  href: string;
  isCategory: boolean;
  icon: string;
  resourceType?: 'PDF' | 'HTML' | 'JSON' | 'GeoJSON' | 'CSV';
}

export default function Overview({ content }: { content: OverviewRow[] }) {
  const tableT = useTranslations('Table');
  const columns = [
    {
      cell: (row: OverviewRow) => transformContentToHTMLElement(row),
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

function transformContentToHTMLElement(contentRow: OverviewRow) {
  const badgeColor = getColorForResourceType(contentRow.resourceType);
  const titleColor = contentRow.isCategory ? 'nav-link' : '';
  return (
    <Link href={contentRow.href} className="d-flex align-items-center text-dark text-decoration-none w-100 px-2 py-4">
      <i className={`bi bi-${contentRow.icon} ${titleColor} fs-1 me-3`} />
      <div>
        <div className={`fs-5 ${titleColor}`}>{contentRow.title}</div>
        <br />
        <div className="fs-6">{contentRow.description}</div>
        {!contentRow.isCategory && (
          <span className="badge my-1" style={{ backgroundColor: badgeColor }}>
            {contentRow.resourceType}
          </span>
        )}
      </div>
    </Link>
  );
}
