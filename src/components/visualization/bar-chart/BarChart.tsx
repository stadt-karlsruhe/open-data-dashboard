import {
  Bar,
  BarChart as BarChartRecharts,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartInput, DataRecord } from '@/types/visualization';
import { AxisPair } from '@/types/configuration';
import AxisSelector from './AxisSelector';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { computeIfAbsent } from '@/utils/maputils';
import { getColor } from '@/colors';
import { useState } from 'react';

let minValue: number;
let maxValue: number;

export default function BarChart({ chartInput }: { chartInput: ChartInput }) {
  const axisPairs = chartInput.axisPairs as AxisPair[];
  const [axesMap, setAxesMap] = useState(collectYAxes(axisPairs));
  const [xAxis, setXAxis] = useState(axisPairs[0].xAxis);

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
      <ResponsiveContainer debounce={200} aspect={chartInput.aspect}>
        <BarChartRecharts
          data={chartInput.data}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} label={xAxis} tick={false} />
          <YAxis type="number" domain={getDomain(chartInput.data, axesMap, xAxis)} ticks={getTicks()} />
          <ReferenceLine y={0} stroke="#000" />
          <Tooltip />
          <Legend onClick={onLegendClick} />
          {getBars()}
        </BarChartRecharts>
      </ResponsiveContainer>
    </div>
  );
}

function getDomain(records: DataRecord, axesMap: Map<string, Map<string, boolean>>, xAxis: string) {
  minValue = 0;
  maxValue = 0;
  const yAxesMap = axesMap.get(xAxis) ?? new Map<string, boolean>();
  const visibleYAxes = new Set([...yAxesMap.entries()].filter(([_, visible]) => visible).map(([yAxis]) => yAxis));
  records.forEach((record) => {
    const valueArray = Object.entries(record)
      .filter(([key]) => visibleYAxes.has(key))
      .map((entry) => entry[1]);
    for (const value of valueArray) {
      const parsedValue = Number.parseFloat(value);
      if (parsedValue > maxValue) {
        maxValue = parsedValue;
      } else if (parsedValue < minValue) {
        minValue = parsedValue;
      }
    }
  });
  return [minValue, maxValue];
}

function collectYAxes(axisPairs: AxisPair[]) {
  const axesMap = new Map<string, Map<string, boolean>>();
  for (const axisPair of axisPairs) {
    const yAxesForXAxis = computeIfAbsent(axesMap, axisPair.xAxis, new Map<string, boolean>()) as Map<string, boolean>;
    computeIfAbsent(yAxesForXAxis, axisPair.yAxis, true);
  }
  return axesMap;
}

function updateAxisMap(xAxis: string, yAxis: string | undefined, axesMap: Map<string, Map<string, boolean>>) {
  if (yAxis === undefined) {
    return axesMap;
  }
  const yAxesForXAxis = computeIfAbsent(axesMap, xAxis, new Map<string, boolean>()) as Map<string, boolean>;
  let bool = yAxesForXAxis.get(yAxis);
  bool = bool === undefined ? true : !bool;
  yAxesForXAxis.set(yAxis, bool);
  // eslint-disable-next-line sonarjs/prefer-immediate-return
  const updatedAxesMap = new Map(axesMap);
  return updatedAxesMap;
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
