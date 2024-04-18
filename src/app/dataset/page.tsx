import DataTable from '@/components/visualization/DataTable';
import { GetStaticProps } from 'next';

type DataSet = Record<string, never>;

interface JsonDictionary {
  fields: [{ type: string; id: string }];
  records: DataSet[];
}

export default async function page() {
  const data = await getData();
  return (
    <>
      <DataTable data={data}></DataTable>
    </>
  );
}

async function getData() {
  const res = await fetch(
    'https://transparenz.karlsruhe.de/datastore/dump/71ef348f-0f5b-46a0-8250-e87aae9f91bd?format=json',
  );
  return (await res.json()) as JsonDictionary;
}
