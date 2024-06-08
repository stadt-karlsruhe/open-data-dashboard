'use client';

import { CSSProperties, useState } from 'react';
import { Configuration, GeoJSONResource, JSONResource, Resource } from '@/schemas/configuration-schema';
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useMiniSearch } from 'react-minisearch';
import { useTranslations } from 'next-intl';

const { useRouter } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

// eslint-disable-next-line max-lines-per-function
export default function Search({
  configuration,
  className,
  style,
}: {
  configuration: Configuration;
  className?: string;
  style?: CSSProperties;
}) {
  const { search, searchResults } = useMiniSearch(configuration.resources, { fields: ['id', 'name', 'description'] });
  const t = useTranslations('Search');
  const [selected, setSelected] = useState([] as (object | string)[]);
  const router = useRouter();

  return (
    <Typeahead
      className={className}
      style={style}
      filterBy={() => true}
      id="search"
      labelKey="name"
      highlightOnlyResult
      onInputChange={(term) => {
        search(term, { prefix: true, fuzzy: 0.5, maxFuzzy: 5, combineWith: 'AND' });
      }}
      selected={selected}
      onChange={(selected) => {
        setSelected(selected);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && selected.length > 0) {
          const resource = selected[0] as Resource;
          setSelected([]);
          search('');
          router.push(`/view/${resource.name.trim().replaceAll(/\s+/gu, '-')}-${resource.id}`);
        }
      }}
      options={searchResults?.slice(0, 6) ?? []}
      placeholder={t('search')}
      emptyLabel={t('emptyLabel')}
      renderMenuItemChildren={(option, props) => {
        const resource = option as Resource;
        const visualizedResource = option as JSONResource | GeoJSONResource;
        return (
          <div className="d-flex flex-column text-center text-wrap">
            <div className="fw-bold">
              <Highlighter search={props.text}>{resource.name}</Highlighter>
            </div>
            <small className="fst-italic">
              {resource.description && <Highlighter search={props.text}>{resource.description}</Highlighter>}
            </small>
            <small>
              (Id: <Highlighter search={props.text}>{resource.id}</Highlighter>)
            </small>
            <div className="my-1">
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
