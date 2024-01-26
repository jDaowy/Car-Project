import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function App() {
  const [gridData, setGridData] = React.useState([]);

  React.useEffect(() => {
    // Fetch data when the component mounts
    fetch("http://localhost:3306/api/get")
      .then((response) => response.json())
      .then((data) => {
        // Generate unique IDs for each row (if 'id' doesn't exist)
        const dataWithIds = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setGridData(dataWithIds);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { field: "fluid_name", headerName: "Fluid Name", width: 200 },
    { field: "check_time", headerName: "Check Time", width: 200 },
    { field: "check_range", headerName: "Check Range", width: 300 },
  ];

  return (
    <div className="data-grid" style={{ height: 300, width: "100%" }}>
      <DataGrid rows={gridData} columns={columns} />
    </div>
  );
}
