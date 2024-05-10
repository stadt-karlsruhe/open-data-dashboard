import {
  Bar,
  BarChart as BarChartRecharts,
  CartesianGrid,
  Label,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartInput, DataRecord } from '@/types/visualization';

let maxValue: number;
let minValue: number;

export default function BarChart({ chartInput }: { chartInput: ChartInput }) {
  getMaxAndMinYValue(chartInput.data, chartInput.yAxis);
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
        <YAxis type="number" domain={[minValue, maxValue]} ticks={getTicks()}>
          <Label angle={270} position={'left'} value={chartInput.yAxis} />
        </YAxis>
        <ReferenceLine y={0} stroke="#000" />
        <Tooltip />
        <Bar dataKey={chartInput.yAxis} fill="#8884d8" activeBar={<Rectangle stroke="blue" />} />
      </BarChartRecharts>
    </ResponsiveContainer>
  );
}

function getMaxAndMinYValue(records: DataRecord, yAxis: string) {
  maxValue = 0;
  minValue = 0;
  records.forEach((record) => {
    const valueArray = Object.entries(record)
      .filter(([key, _]) => key === yAxis)
      .map((entry) => entry[1]);
    for (const value of valueArray) {
      const parsedValue = Number.parseInt(value, 10);
      if (parsedValue > maxValue) {
        maxValue = parsedValue;
      } else if (parsedValue < minValue) {
        minValue = parsedValue;
      }
    }
  });
  return maxValue;
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
