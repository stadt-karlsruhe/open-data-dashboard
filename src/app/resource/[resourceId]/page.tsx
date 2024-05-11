import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import Visualization from '@/components/visualization/layout/Visualization';
import config from '../../../../data-source.config.yml';
export default function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const resource = config.resources.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <></>;
  }

  if (resource.type === 'Embedded') {
    return (
      <>
        <EmbeddedViewer source={resource.source}></EmbeddedViewer>
      </>
    );
  }
  return (
    <>
      <Visualization resource={resource}></Visualization>
    </>
  );
}

export function generateStaticParams() {
  return config.resources.map((data) => ({
    resourceId: data.id,
  }));
}
