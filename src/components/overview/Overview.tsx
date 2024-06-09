'use client';

// eslint-disable-next-line import/named
import { TableColumn } from 'react-data-table-component';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import dynamic from 'next/dynamic';
import { getColorForResourceType } from '@/colors';
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

export default function Overview({
  content,
  header,
}: {
  content: OverviewRow[];
  header: {
    name: string;
    description: string;
  };
}) {
  const tableT = useTranslations('Table');
  const columns = [
    {
      cell: (row: OverviewRow) => transformContentToHTMLElement(row),
      compact: true,
    },
  ] as TableColumn<unknown>[];
  return (
    <div className="flex-fill">
      <h3>{header.name}</h3>
      <p className="lead">{header.description}</p>
      <DataTable
        dense={true}
        columns={columns}
        data={content}
        noDataComponent={tableT('noRecords')}
        highlightOnHover
        pagination
        paginationComponentOptions={{
          rowsPerPageText: tableT('rowsPerPageText'),
          rangeSeparatorText: tableT('rangeSeparatorText'),
          selectAllRowsItem: true,
          selectAllRowsItemText: tableT('selectAllRowsItemText'),
        }}
      />
    </div>
  );
}

// TODO: add logos for categories and datasets
function transformContentToHTMLElement(contentRow: OverviewRow) {
  const badgeColor = getColorForResourceType(contentRow.resourceType);
  const titleColor = contentRow.isCategory ? 'nav-link' : '';
  return (
    <Link href={contentRow.href} className="d-flex align-items-center text-dark text-decoration-none w-100 p-2">
      <i className={`bi bi-${contentRow.icon} ${titleColor} fs-1 me-3`} />
      <div>
        <div className={`fs-5 ${titleColor}`}>{contentRow.title}</div>
        <br />
        <div className="fs-6">{contentRow.description}</div>
        {!contentRow.isCategory && (
          <span className="badge" style={{ backgroundColor: badgeColor }}>
            {contentRow.resourceType}
          </span>
        )}
      </div>
    </Link>
  );
}
