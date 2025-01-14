import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  headers: string[];
  headerKeys: string[];
  data: { [key: string]: any }[];
  getCellClassAndFormattedValue?: (
    column: string,
    value: string | number
  ) => { cellClass: string; formattedValue: number | string }; // Optional callback function
  onRowClick?: (row: { [key: string]: any }) => void;
}

const Table: React.FC<TableProps> = ({
  headers,
  headerKeys,
  data,
  getCellClassAndFormattedValue,
  onRowClick,
}) => {
  const handleRowClick = (row: { [key: string]: any }) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div className={styles["table-container"]}>
      <table className={styles["table"]}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={styles["table-header"]}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? styles["even"] : styles["odd"]}
              onClick={() => handleRowClick(row)}
            >
              {headerKeys.map((header, index) => {
                if (getCellClassAndFormattedValue) {
                  const { cellClass, formattedValue } =
                    getCellClassAndFormattedValue(header, row[header]);
                  return (
                    <td
                      key={index}
                      className={`${styles["table-cell"]} ${cellClass}`}
                    >
                      {formattedValue}
                    </td>
                  );
                } else {
                  const cellValue = row[header];
                  return (
                    <td key={index} className={styles["table-cell"]}>
                      {cellValue}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
