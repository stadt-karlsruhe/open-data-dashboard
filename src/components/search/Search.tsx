'use client';

import { CSSProperties, useState } from 'react';
import {
  configurationToCategories,
  configurationToDashboards,
  configurationToResources,
  configurationToSubcategories,
} from '@/utils/mapUtils';

import { Configuration } from '@/schemas/configuration/configurationSchema';
import { DataElement } from '@/types/data';
import SearchResult from './SearchResult';
import { Typeahead } from 'react-bootstrap-typeahead';
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
  id,
  className,
  style,
}: {
  configuration: Configuration;
  id: string;
  className?: string;
  style?: CSSProperties;
}) {
  const { search, searchResults } = useMiniSearch(getSearchableElements(configuration), {
    fields: ['name', 'description'],
  });
  const t = useTranslations('Search');
  const [selected, setSelected] = useState([] as (object | string)[]);
  const router = useRouter();

  return (
    <Typeahead
      className={`d-flex ${className ?? ''}`}
      style={{ ...style, zIndex: 500 }}
      filterBy={() => true}
      id={id}
      labelKey="name"
      highlightOnlyResult
      inputProps={{
        id: `${id}-input`,
      }}
      onInputChange={(term) => {
        search(term, { prefix: true, fuzzy: 0.5, maxFuzzy: 5, combineWith: 'AND' });
      }}
      selected={selected}
      onChange={(selected) => {
        setSelected(selected);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && selected.length > 0) {
          const dataElement = selected[0] as DataElement;
          setSelected([]);
          search('');
          router.push(dataElement.href);
        }
      }}
      options={searchResults?.slice(0, 6) ?? []}
      placeholder={t('search')}
      emptyLabel={t('emptyLabel')}
      renderMenuItemChildren={(option, props) => {
        return <SearchResult element={option as DataElement} menuProps={props} />;
      }}
    >
      <button
        className="d-flex align-items-center bottom-0 justify-content-center position-absolute end-0 top-0 bg-transparent me-lg-2 my-lg-2 border-0 custom-opacity"
        style={{ color: 'var(--bs-gray-600)' }}
        onClick={() => {
          if (selected.length > 0) {
            const dataElement = selected[0] as DataElement;
            setSelected([]);
            search('');
            router.push(dataElement.href);
          }
        }}
      >
        <i className="bi bi-search" />
      </button>
    </Typeahead>
  );
}

function getSearchableElements(configuration: Configuration) {
  const resources = configurationToResources(configuration);
  const categories = configurationToCategories(configuration);
  const subcategories = configurationToSubcategories(configuration);
  const dashboards = configurationToDashboards(configuration);
  return [...resources, ...dashboards, ...categories, ...subcategories];
}
