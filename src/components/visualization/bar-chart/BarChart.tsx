import {
  Bar,
  BarChart as BarChartRecharts,
  CartesianGrid,
  DefaultTooltipContent,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { useEffect, useState } from 'react';

import { AxisPair } from '@/schemas/configurationSchema';
import AxisSelector from './AxisSelector';
import { CustomTooltip } from './CustomTooltip';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { TransformedData } from '@/schemas/dataSchema';
import { computeIfAbsent } from '@/utils/mapUtils';
import { getColor } from '@/utils/colors';

let minValue: number;
let maxValue: number;

export default function BarChart({
  data,
  axisPairs,
  aspect,
}: {
  data: TransformedData[];
  axisPairs: AxisPair[];
  aspect: number;
}) {
  const [axesMap, setAxesMap] = useState(collectYAxes(axisPairs));
  const [xAxis, setXAxis] = useState(axisPairs[0].xAxis);

  // TODO: Ignores defaultProps errors. Remove once recharts 2.13.0 is released (https://github.com/recharts/recharts/issues/3615)
  useEffect(() => {
    const { error } = console;
    console.error = (...args: Parameters<typeof console.error>) => {
      if (typeof args[0] === 'string' && args[0].includes('defaultProps')) {
        return;
      }
      error(...args);
    };
  }, []);

  function onLegendClick(e: Payload) {
    setAxesMap(updateAxisMap(xAxis, e.dataKey?.toString(), axesMap));
  }

  function getBars() {
    const yAxesMap = axesMap.get(xAxis) ?? new Map<string, boolean>();
    return [...yAxesMap.entries()].map(([yAxis, visible], index) => (
      <Bar key={index} dataKey={yAxis} hide={!visible} fill={getColor(index)} isAnimationActive={false} />
    ));
  }
  return (
    <div>
      <AxisSelector axesMap={axesMap} setAxis={setXAxis} />
      <ResponsiveContainer debounce={200} aspect={aspect}>
        <BarChartRecharts
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} label={xAxis} tick={false} />
          <YAxis type="number" domain={getDomain(data, axesMap, xAxis)} ticks={getTicks()} />
          <ReferenceLine y={0} stroke="#000" />
          <Tooltip content={<CustomTooltip axesMap={axesMap} xAxis={xAxis} />} />
          <Legend onClick={onLegendClick} />
          {getBars()}
        </BarChartRecharts>
      </ResponsiveContainer>
    </div>
  );
}

function getDomain(records: TransformedData[], axesMap: Map<string, Map<string, boolean>>, xAxis: string) {
  minValue = 0;
  maxValue = 0;
  const yAxesMap = axesMap.get(xAxis) ?? new Map<string, boolean>();
  const visibleYAxes = new Set([...yAxesMap.entries()].filter(([, visible]) => visible).map(([yAxis]) => yAxis));
  records.forEach((record) => {
    const valueArray = Object.entries(record)
      .filter(([key]) => visibleYAxes.has(key))
      .map((entry) => entry[1]);
    for (const value of valueArray) {
      if (typeof value === 'number') {
        if (value > maxValue) {
          maxValue = value;
        } else if (value < minValue) {
          minValue = value;
        }
      }
    }
  });
  return [minValue, maxValue];
}

function collectYAxes(axisPairs: AxisPair[]) {
  const axesMap = new Map<string, Map<string, boolean>>();
  for (const [i, axisPair] of axisPairs.entries()) {
    const yAxesForXAxis = computeIfAbsent(axesMap, axisPair.xAxis, () => new Map<string, boolean>()) as Map<
      string,
      boolean
    >;
    computeIfAbsent(yAxesForXAxis, axisPair.yAxis, () => i === 0);
  }
  return axesMap;
}

function updateAxisMap(xAxis: string, yAxis: string | undefined, axesMap: Map<string, Map<string, boolean>>) {
  if (yAxis === undefined) {
    return axesMap;
  }
  const yAxesForXAxis = computeIfAbsent(axesMap, xAxis, () => new Map<string, boolean>()) as Map<string, boolean>;
  let bool = yAxesForXAxis.get(yAxis);
  bool = bool === undefined ? true : !bool;
  yAxesForXAxis.set(yAxis, bool);
  return new Map(axesMap);
}

function getTicks() {
  const ticks: number[] = [];
  if (minValue < 0) {
    ticks.push(minValue);
  }
  ticks.push(0);
  if (maxValue > 0) {
    ticks.push(maxValue);
  }
  return ticks;
}
