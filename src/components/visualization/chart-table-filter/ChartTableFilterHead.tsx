import { ClearableInputGroup } from './ClearableInputGroup';
import { useTranslations } from 'next-intl';

const allEntries = 'all-entries';

export function ChartTableFilterHead({
  resourceId,
  filters,
  isCollapsed,
  onChange,
  onCollapse,
}: {
  resourceId: string;
  filters: Record<string, string>;
  isCollapsed: boolean;
  onChange: (key: string, value: string) => void;
  onCollapse: () => void;
}) {
  const t = useTranslations('ChartTableFilterHead');
  return (
    <ClearableInputGroup
      id={`${resourceId}-search`}
      type="search"
      value={filters[allEntries] ?? ''}
      label={t('searchAll')}
      onChange={(e) => {
        onChange(allEntries, e.target.value);
      }}
      onClear={() => {
        onChange(allEntries, '');
      }}
    >
      <button
        className="btn btn-primary rounded-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${resourceId}-filter`}
        aria-expanded="false"
        aria-controls={`${resourceId}-filter`}
        title={isCollapsed ? t('collapseTooltipExpand') : t('collapseTooltipCollapse')}
        onClick={onCollapse}
      >
        {isCollapsed ? <i className="bi bi-caret-down-square"></i> : <i className="bi bi-caret-up-square"></i>}
      </button>
    </ClearableInputGroup>
  );
}
