import { useId } from "react";
interface TableProps  {
  columns: string[];
  rows: string[];
}
const Table = ({columns, rows}: TableProps) => {
  if (!Array.isArray(columns) || !Array.isArray(rows)) {
    throw new Error("Les propriétés columns et rows doivent être de type Array.");
  }
  return (
    <table className="table table-shadow">
      <thead>
        <tr>
         {
          columns.map((column) => (<th key={useId()}>{column}</th>))
         }
        </tr>
      </thead>
       <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td >{row}</td>
            <td >{row}</td>
            <td >{row}</td>
          </tr>
        )
        
        )}
       </tbody>
    </table>
  )
}

export default Table