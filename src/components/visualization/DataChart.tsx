'use-client';

import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartInput } from '@/types/visualization';

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function customChart(chartInput: ChartInput) {
  const { labels, datapoints } = chartInput;
  const data = {
    labels,
    datasets: datapoints,
  };
  // eslint-disable-next-line react/display-name
  return () => <Bar data={data} />;
}
