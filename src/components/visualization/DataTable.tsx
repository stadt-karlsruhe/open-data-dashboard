import { DataRecord } from '@/types/visualization';
import Table from 'react-bootstrap/Table';

interface Props {
  data: DataRecord;
}

export default function DataTable({ data }: Props) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {data.fields.map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.records.map((row, index) => (
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
