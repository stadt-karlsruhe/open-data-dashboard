import { DefaultTooltipContent, type TooltipProps } from 'recharts';
import { computeIfAbsent } from '@/utils/mapUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomTooltipProps extends TooltipProps<any, any> {
  axesMap: Map<string, Map<string, boolean>>;
  xAxis: string;
}

export default function CustomTooltip(props: CustomTooltipProps) {
  if (!props.active) {
    return null;
  }
  if (!props.payload?.[0]?.payload) {
    return <DefaultTooltipContent {...props} />;
  }
  const yAxes = computeIfAbsent(props.axesMap, props.xAxis, () => new Map<string, boolean>()) as Map<string, boolean>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const payloadAddition = Object.entries(props.payload[0].payload)
    .filter((entry) => entry[0] !== props.xAxis && !yAxes.has(entry[0]))
    .map((entry) => {
      return {
        name: entry[0],
        value: entry[1],
      };
    });

  return <DefaultTooltipContent {...props} payload={[...payloadAddition, ...props.payload]} />;
}
