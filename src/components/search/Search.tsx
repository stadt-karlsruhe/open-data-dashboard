'use client';

import { CSSProperties, useState } from 'react';
import {
  configurationToCategories,
  configurationToDashboards,
  configurationToResources,
  configurationToSubcategories,
} from '@/utils/mapUtils';

import { Configuration } from '@/schemas/configurationSchema';
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
      className={className}
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
    />
  );
}

function getSearchableElements(configuration: Configuration) {
  const resources = configurationToResources(configuration);
  const categories = configurationToCategories(configuration);
  const subcategories = configurationToSubcategories(configuration);
  const dashboards = configurationToDashboards(configuration);
  return [...resources, ...dashboards, ...categories, ...subcategories];
}
