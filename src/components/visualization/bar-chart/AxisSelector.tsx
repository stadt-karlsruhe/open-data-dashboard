import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';

export default function AxisSelector({
  axesMap,
  setAxis,
}: {
  axesMap: Map<string, Map<string, boolean>>;
  setAxis: Dispatch<SetStateAction<string>>;
}) {
  const t = useTranslations('AxisSelector');
  if (axesMap.size < 2) {
    return <div />;
  }

  const onAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAxis(e.target.value);
  };

  return (
    <div className="mb-1" style={{ display: 'table' }}>
      <label style={{ display: 'table-cell' }}>{t('title')}</label>
      <select
        onChange={onAxisChange}
        id="x-axis-selector"
        aria-label="x-axis-selector"
        className="form-select"
        style={{ maxWidth: '200px', display: 'table-cell', marginLeft: '1vw' }}
      >
        {[...axesMap.entries()].map(([xAxis, _]) => (
          <option key={xAxis} value={xAxis}>
            {xAxis}
          </option>
        ))}
      </select>
    </div>
  );
}
