'use client';

import { EmbeddedResource, GeoJSONResource, JSONResource } from '@/schemas/configuration-schema';

import DataTable from 'react-data-table-component';
import Link from 'next/link';
import React from 'react';

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
  switch (resource.type) {
    case 'Embedded': {
      badge = (
        <span className="badge" style={{ backgroundColor: '#e0051e' }}>
          PDF
        </span>
      );
      break;
    }
    case 'GeoJSON': {
      badge = (
        <span className="badge" style={{ backgroundColor: '#9855e0' }}>
          GeoJSON
        </span>
      );
      break;
    }
    case 'JSON': {
      badge = (
        <span className="badge" style={{ backgroundColor: '#207e42' }}>
          JSON
        </span>
      );
      break;
    }
    case 'CSV': {
      badge = (
        <span className="badge" style={{ backgroundColor: '#856a00' }}>
          CSV
        </span>
      );
      break;
    }
    default: {
      break;
    }
  }
  return (
    <Link
      href={`/view/${resource.name.trim().replaceAll(/\s+/gu, '-')}-${resource.id}`}
      className="text-dark text-decoration-none w-100 m-2"
      style={{}}
    >
      <div className="fs-5">{resource.name}</div>
      <br />
      <div className="fs-6">{resource.description}</div>
      {badge}
    </Link>
  );
}
