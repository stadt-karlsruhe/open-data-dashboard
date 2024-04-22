import {
  Bar,
  BarChart as BarChartRecharts,
  CartesianGrid,
  Label,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartInput, DataRecord } from '@/types/visualization';

export default function BarChart({ chartInput }: { chartInput: ChartInput }) {
  const maxValue = getMaxYValue(chartInput.data, chartInput.yAxis);
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <YAxis type="number" domain={[0, maxValue]}>
          <Label angle={270} position={'left'} value={chartInput.yAxis} />
        </YAxis>
        <Tooltip />
        <Bar dataKey={chartInput.yAxis} fill="#8884d8" activeBar={<Rectangle stroke="blue" />} />
      </BarChartRecharts>
    </ResponsiveContainer>
  );
}

function getMaxYValue(records: DataRecord, yAxis: string) {
  let maxValue = 0;
  records.forEach((record) => {
    const valueArray = Object.entries(record)
      .filter(([key, _]) => key === yAxis)
      .map((entry) => entry[1]);
    for (const value of valueArray) {
      const parsedValue = Number.parseInt(value, 10);
      if (parsedValue > maxValue) {
        maxValue = parsedValue;
      }
    }
  });
  return maxValue;
}
