export default function Table({ columns, data }) {
  return (
    <table className="w-full border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="p-2 border">
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col} className="p-2 border">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}