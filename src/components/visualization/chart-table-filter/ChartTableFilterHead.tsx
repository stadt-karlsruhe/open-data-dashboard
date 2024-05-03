import { FloatingLabelInput } from './FloatingLabelInput';
import { useTranslations } from 'next-intl';

export function ChartTableFilterHead({
  resourceId,
  filters,
  isCollapsed,
  onChange,
  onCollapse,
  onClear,
}: {
  resourceId: string;
  filters: Record<string, string>;
  isCollapsed: boolean;
  onChange: (key: string, value: string) => void;
  onCollapse: () => void;
  onClear: () => void;
}) {
  const t = useTranslations('ChartTableFilterHead');
  return (
    <div className="input-group mb-3">
      <FloatingLabelInput
        id={`${resourceId}-search`}
        type="text"
        value={filters['all-entries'] ?? ''}
        label={t('searchAll')}
        onChange={(e) => {
          onChange('all-entries', e.target.value);
        }}
      />
      <button className="btn btn-secondary px-2 rounded-0" title={t('clearTooltip')} onClick={onClear}>
        <i className="bi bi-x-lg"></i>
      </button>
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
    </div>
  );
}
