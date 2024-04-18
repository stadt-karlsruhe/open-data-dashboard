import Table from 'react-bootstrap/Table';

type DataSet = Record<string, never>;

interface Props {
  data: JsonDictionary;
}

interface JsonDictionary {
  fields: [{ type: string; id: string }];
  records: DataSet[];
}

const getHeaderNames = (jsonData: JsonDictionary) => {
  return jsonData.fields.map((field) => field.id);
};

export default function DataTable({ data }: Props) {
  const headers = getHeaderNames(data);
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
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
