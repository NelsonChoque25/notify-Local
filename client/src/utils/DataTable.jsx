import { useContext, useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { IoIosArrowDown } from "react-icons/io";
import LoaderDataTable from "./LoaderDataTable";
import DarkModeContext from "../contexts/DarkModeContext";

createTheme(
  "myDarkTheme",
  {
    text: {
      primary: "#ffffff",
      secondary: "#d3d3d3",
    },
    background: {
      default: "#343a40",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

function DataTableBase(props) {
  const darkMode = useContext(DarkModeContext);
  const sortIcon = <IoIosArrowDown />;
  const [pending, setPending] = useState(true);
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <DataTable
      sortIcon={sortIcon}
      fixedHeader
      highlightOnHover
      pointerOnHover
      responsive
      progressPending={pending}
      progressComponent={<LoaderDataTable />}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
      theme={darkMode ? "myDarkTheme" : "default"}
      {...props}
    />
  );
}

export default DataTableBase;
