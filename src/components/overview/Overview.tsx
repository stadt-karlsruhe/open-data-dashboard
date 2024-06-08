'use client';

import { EmbeddedResource, GeoJSONResource, JSONResource } from '@/schemas/configuration-schema';

import DataTable from 'react-data-table-component';
import Link from 'next/link';
import React from 'react';
import { getColorForResourceType } from '@/colors';

export default function Overview({ resources }: { resources: (EmbeddedResource | GeoJSONResource | JSONResource)[] }) {
  const testColumns = [
    {
      name: 'Data',
      cell: (row: { html: React.JSX.Element }) => row.html,
    },
  ];
  return <DataTable columns={testColumns} data={getDataForResources(resources)} highlightOnHover />;
}

function getDataForResources(resources: (EmbeddedResource | GeoJSONResource | JSONResource)[]) {
  const dataArray = [];
  for (const resource of resources) {
    dataArray.push({
      html: transformResourceOverview(resource),
    });
  }
  return dataArray;
}

function transformResourceOverview(resource: EmbeddedResource | GeoJSONResource | JSONResource) {
  let badge;
  const badgeColor = getColorForResourceType(resource.type);
  const badgeText = getTextForResourceType(resource.type);
  return (
    <Link
      href={`/view/${resource.name.trim().replaceAll(/\s+/gu, '-')}-${resource.id}`}
      className="text-dark text-decoration-none w-100 m-2"
      style={{}}
    >
      <div className="fs-5">{resource.name}</div>
      <br />
      <div className="fs-6">{resource.description}</div>
      {badgeText && (
        <span className="badge" style={{ backgroundColor: badgeColor }}>
          {badgeText}
        </span>
      )}
    </Link>
  );
}

function getTextForResourceType(type: 'JSON' | 'GeoJSON' | 'CSV' | 'Embedded') {
  switch (type) {
    case 'Embedded': {
      return 'PDF';
    }
    case 'GeoJSON':
    case 'JSON':
    case 'CSV': {
      return type;
    }
    default:
  }
}
