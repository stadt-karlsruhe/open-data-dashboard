'use client';

import { EmbeddedResource, GeoJSONResource, JSONResource } from '@/schemas/configuration-schema';

import React from 'react';
// eslint-disable-next-line import/named
import { TableColumn } from 'react-data-table-component';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import dynamic from 'next/dynamic';
import { getColorForResourceType } from '@/colors';
import { locales } from '@/locales';
import { replaceWhitespaceInString } from '@/utils/stringutils';
import { useTranslations } from 'next-intl';

// Avoid hydration error inside Table pagination https://stackoverflow.com/questions/77763766/next-js-hydration-error-with-shadcn-dialog-component
const DataTable = dynamic(() => import('react-data-table-component'), { ssr: false });

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function Overview({
  resources,
  categories,
}: {
  resources: (EmbeddedResource | GeoJSONResource | JSONResource)[];
  categories: string[] | undefined;
}) {
  const tableT = useTranslations('Table');
  const columns = [
    {
      cell: (row: { html: React.JSX.Element }) => row.html,
    },
  ] as TableColumn<unknown>[];
  return (
    <div className="flex-fill">
      <DataTable
        columns={columns}
        data={getDataForResources(resources, categories)}
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

function getDataForResources(
  resources: (EmbeddedResource | GeoJSONResource | JSONResource)[],
  categories: string[] | undefined,
) {
  const dataArray = [];
  for (const resource of resources) {
    if (resourceShouldBeDisplayed(resource.category, resource.subcategory, categories)) {
      dataArray.push({
        html: transformResourceOverview(resource),
      });
    }
  }
  return dataArray;
}

function resourceShouldBeDisplayed(
  resourceCategory: string | undefined,
  resourceSubcategory: string | undefined,
  categories: string[] | undefined,
) {
  if (categories === undefined) {
    return true;
  }
  if (resourceCategory === undefined || categories[0] !== replaceWhitespaceInString(resourceCategory)) {
    return false;
  }
  if (categories.length < 2) {
    return true;
  }
  return resourceSubcategory !== undefined && categories[1] === replaceWhitespaceInString(resourceSubcategory);
}

function transformResourceOverview(resource: EmbeddedResource | GeoJSONResource | JSONResource) {
  const badgeColor = getColorForResourceType(resource.type);
  return (
    <Link
      href={`/view/${replaceWhitespaceInString(resource.name)}-${resource.id}`}
      className="text-dark text-decoration-none w-100 m-2"
      style={{}}
    >
      <div className="fs-5">{resource.name}</div>
      <br />
      <div className="fs-6">{resource.description}</div>
      {badgeColor && (
        <span className="badge" style={{ backgroundColor: badgeColor }}>
          {resource.type}
        </span>
      )}
    </Link>
  );
}
