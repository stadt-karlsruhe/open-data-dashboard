'use client';

import { CSSProperties, useState } from 'react';
import { Configuration, Resource } from '@/schemas/configuration-schema';

import SearchResult from './SearchResult';
import { Typeahead } from 'react-bootstrap-typeahead';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getColorForResourceType } from '@/colors';
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
  const { search, searchResults } = useMiniSearch(configuration.resources, { fields: ['name', 'description'] });
  const t = useTranslations('Search');
  const [selected, setSelected] = useState([] as (object | string)[]);
  const router = useRouter();

  return (
    <Typeahead
      className={className}
      style={style}
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
        return <SearchResult resource={option as Resource} menuProps={props} />;
      }}
    />
  );
}
