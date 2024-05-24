import { ChangeEvent, ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export function ClearableInputGroup({
  id,
  type,
  value,
  label,
  onChange,
  onClear,
  children,
}: {
  id: string;
  type: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  children?: ReactNode;
}) {
  const t = useTranslations('ClearableInputGroup');
  return (
    <div className="input-group mb-3">
      <div className="form-floating">
        <input type={type} id={id} className="form-control" value={value} onChange={onChange} />
        <label htmlFor={id}>{label}</label>
      </div>
      <button className="btn btn-secondary border-start-0 px-2" title={t('clearTooltip')} onClick={onClear}>
        <i className="bi bi-x-lg"></i>
      </button>
      {children}
    </div>
  );
}
