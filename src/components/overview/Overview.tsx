'use client';

import { EmbeddedResource, GeoJSONResource, JSONResource } from '@/schemas/configuration-schema';

import DataTable from 'react-data-table-component';
import Link from 'next/link';
import React from 'react';
import { getColorForResourceType } from '@/colors';
import { replaceWhitespaceInString } from '@/utils/stringutils';

export default function Overview({
  resources,
  categories,
}: {
  resources: (EmbeddedResource | GeoJSONResource | JSONResource)[];
  categories: string[] | undefined;
}) {
  const testColumns = [
    {
      name: 'Data',
      cell: (row: { html: React.JSX.Element }) => row.html,
    },
  ];
  return <DataTable columns={testColumns} data={getDataForResources(resources, categories)} highlightOnHover />;
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
