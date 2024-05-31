import AccordionContext from 'react-bootstrap/AccordionContext';
import { ClearableInputGroup } from './ClearableInputGroup';
import { Filter } from '@/schemas/configuration-schema';
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
  filters: Record<string, Filter>;
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
      type="text"
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
        className="btn btn-primary"
        type="button"
        name={isCurrentEventKey ? t('collapseTooltipCollapse') : t('collapseTooltipExpand')}
        title={isCurrentEventKey ? t('collapseTooltipCollapse') : t('collapseTooltipExpand')}
        onClick={decoratedOnClick}
      >
        {isCurrentEventKey ? <i className="bi bi-caret-up-square"></i> : <i className="bi bi-caret-down-square"></i>}
      </button>
    </ClearableInputGroup>
  );
}
