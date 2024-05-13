import AccordionContext from 'react-bootstrap/AccordionContext';
import { ClearableInputGroup } from './ClearableInputGroup';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { useContext } from 'react';
import { useTranslations } from 'next-intl';

const allEntries = 'all-entries';

export function ChartTableFilterHeader({
  resourceId,
  filters,
  eventKey,
  onChange,
}: {
  resourceId: string;
  filters: Record<string, string | { min?: string; max?: string }>;
  eventKey: string;
  onChange: (key: string, value: string) => void;
}) {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey);
  const isCurrentEventKey = activeEventKey === eventKey;

  const t = useTranslations('ChartTableFilterHead');
  return (
    <ClearableInputGroup
      id={`${resourceId}-search`}
      type="search"
      value={typeof filters[allEntries] === 'string' && filters[allEntries] ? filters[allEntries] : ''}
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
        title={isCurrentEventKey ? t('collapseTooltipCollapse') : t('collapseTooltipExpand')}
        onClick={decoratedOnClick}
      >
        {isCurrentEventKey ? <i className="bi bi-caret-up-square"></i> : <i className="bi bi-caret-down-square"></i>}
      </button>
    </ClearableInputGroup>
  );
}
