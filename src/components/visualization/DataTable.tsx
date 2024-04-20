import { DataRecord } from '@/types/visualization';
import Table from 'react-bootstrap/Table';

export default function DataTable({ record }: { record: DataRecord }) {
  if (record.length === 0) {
    return <></>;
  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {Object.keys(record[0]).map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {record.map((row, index) => (
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
