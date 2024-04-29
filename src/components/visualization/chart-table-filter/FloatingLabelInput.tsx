import { ChangeEvent } from 'react';

export function FloatingLabelInput({
  id,
  type,
  value,
  label,
  onChange,
}: {
  id: string;
  type: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="form-floating">
      <input type={type} id={id} className="form-control rounded-0" value={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
