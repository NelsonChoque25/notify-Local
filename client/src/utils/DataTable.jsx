import DataTable from "react-data-table-component";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import LoaderDataTable from "./LoaderDataTable";

function DataTableBase(props) {
  const sortIcon = <IoIosArrowDown />;
  const [pending, setPending] = useState(true);
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
};

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const customStyles = {
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "14px",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(230, 244, 244)",
        borderBottomColor: "#FFFFFF",
        borderRadius: "5px",
        outline: "1px solid #FFFFFF",
      },
    },
  };
    
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
      customStyles={customStyles}
      {...props}
    />
  );
}

export default DataTableBase;
