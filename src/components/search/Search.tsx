'use client';

import { Configuration, GeoJSONResource, JSONResource, Resource } from '@/schemas/configuration-schema';

import { Typeahead } from 'react-bootstrap-typeahead';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useMiniSearch } from 'react-minisearch';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const { useRouter } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function Search({ configuration, className }: { configuration: Configuration; className?: string }) {
  const { search, searchResults } = useMiniSearch(configuration.resources, { fields: ['id', 'name', 'description'] });
  const t = useTranslations('Search');
  const [selected, setSelected] = useState([] as (object | string)[]);
  const router = useRouter();

  return (
    <Typeahead
      className={className}
      filterBy={() => true}
      id="search"
      labelKey="name"
      highlightOnlyResult
      onInputChange={(term) => {
        search(term, { prefix: true });
      }}
      selected={selected}
      onChange={(selected) => {
        setSelected(selected);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && selected.length > 0) {
          const resource = selected[0] as Resource;
          router.push(`/view/${resource.name.trim().replaceAll(/\s+/gu, '-')}-${resource.id}`);
          setSelected([]);
        }
      }}
      options={searchResults ?? []}
      placeholder={t('search')}
      emptyLabel={t('entryLabel')}
      renderMenuItemChildren={(option) => {
        const resource = option as Resource;
        const visualizedResource = option as JSONResource | GeoJSONResource;
        return (
          <div className="d-flex flex-column text-center text-wrap">
            <span>{resource.name}</span>
            <small className="fst-italic">{resource.description}</small>
            <div className="align-self-start my-1">
              <div className="badge bg-secondary p-2">{resource.type}</div>
              {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
              {visualizedResource.visualizations !== undefined &&
                Object.keys(visualizedResource.visualizations).map((visualization, index) => (
                  <div key={index} className="badge bg-secondary align-self-start p-2 ms-1">
                    {visualization.replaceAll(/\b\w/gu, (char) => char.toUpperCase())}
                  </div>
                ))}
            </div>
          </div>
        );
      }}
    />
  );
}
