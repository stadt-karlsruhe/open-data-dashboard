import { TransformedData, transform } from '@/schemas/data-schema';

import ChartTableWrapper from './ChartTableWrapper';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { TransformableResource } from '@/schemas/configuration-schema';
import { useMemo } from 'react';

const transformCache = new Map<string, never>();

export default function TransformCache({ resource, data }: { resource: TransformableResource; data: TransformedData }) {
  const cacheKey = `${resource.type}-${resource.source}`;

  const transformedData = useMemo(() => {
    if (transformCache.has(cacheKey)) {
      console.error('returned cached');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-confusing-void-expression
      return transformCache.get(cacheKey)!;
    }
    console.error('returned not cached');
    const result = transform(resource, data);
    transformCache.set(cacheKey, result as never);
    return result;
  }, [cacheKey, resource, data]);

  if (!transformedData.success) {
    return <ErrorComponent type="dataEmpty" resource={resource} error={JSON.stringify(transformedData.error)} />;
  }

  return <ChartTableWrapper resource={resource} transformedData={transformedData.data} />;
}
