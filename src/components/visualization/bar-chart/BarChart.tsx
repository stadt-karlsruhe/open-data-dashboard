import {
  Bar,
  BarChart as BarChartRecharts,
  CartesianGrid,
  Label,
  Legend,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartInput, DataRecord } from '@/types/visualization';
import { AxisPair } from '@/types/configuration';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { getColor } from '@/colors';
import { useState } from 'react';

let minValue: number;
let maxValue: number;

export default function BarChart({ chartInput }: { chartInput: ChartInput }) {
  const [axesMap, setAxesMap] = useState(collectYAxes(chartInput.axisPairs as AxisPair[]));

  function onLegendClick(e: Payload) {
    setAxesMap(updateAxisMap(chartInput.xAxis, e.dataKey?.toString(), axesMap));
  }

  function getBars() {
    let yAxesMap = axesMap.get(chartInput.xAxis);
    yAxesMap = yAxesMap ?? new Map<string, boolean>();
    return [...yAxesMap.entries()].map(([yAxis, visible], index) => (
      // eslint-disable-next-line react/jsx-key
      <Bar dataKey={yAxis} hide={!visible} fill={getColor(index)} />
    ));
  }

  return (
    <ResponsiveContainer debounce={200} aspect={chartInput.aspect}>
      <BarChartRecharts
        data={chartInput.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chartInput.xAxis} label={chartInput.xAxis} tick={false} />
        <YAxis type="number" domain={getDomain(chartInput.data, axesMap, chartInput.xAxis)} ticks={getTicks()} />
        <ReferenceLine y={0} stroke="#000" />
        <Tooltip />
        <Legend onClick={onLegendClick} />
        {getBars()}
      </BarChartRecharts>
    </ResponsiveContainer>
  );
}

function getDomain(records: DataRecord, axesMap: Map<string, Map<string, boolean>>, xAxis: string) {
  minValue = 0;
  maxValue = 0;
  const yAxesMap = axesMap.get(xAxis) ?? new Map<string, boolean>();
  const visibleYAxes = new Set([...yAxesMap.entries()].filter(([_, visible]) => visible).map(([yAxis, _]) => yAxis));
  records.forEach((record) => {
    const valueArray = Object.entries(record)
      .filter(([key, _]) => visibleYAxes.has(key))
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
    let yAxiForXAxis = axesMap.get(axisPair.xAxis);
    if (yAxiForXAxis === undefined) {
      yAxiForXAxis = new Map<string, boolean>();
      axesMap.set(axisPair.xAxis, yAxiForXAxis);
    }
    if (yAxiForXAxis.get(axisPair.yAxis) === undefined) {
      yAxiForXAxis.set(axisPair.yAxis, true);
    }
  }
  return axesMap;
}

function updateAxisMap(xAxis: string, yAxis: string | undefined, axesMap: Map<string, Map<string, boolean>>) {
  if (yAxis === undefined) {
    return axesMap;
  }
  let yAxiForXAxis = axesMap.get(xAxis);
  if (yAxiForXAxis === undefined) {
    yAxiForXAxis = new Map<string, boolean>();
  }
  let bool = yAxiForXAxis.get(yAxis);
  bool = bool === undefined ? true : !bool;
  yAxiForXAxis.set(yAxis, bool);
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
