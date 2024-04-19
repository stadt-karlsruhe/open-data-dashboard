import { DataRecord } from '@/types/visualization';
import Table from 'react-bootstrap/Table';

interface Props {
  data: DataRecord;
}

export default function DataTable({ data }: Props) {
  if (data.length === 0) {
    return <></>;
  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {Object.keys(data[0]).map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
