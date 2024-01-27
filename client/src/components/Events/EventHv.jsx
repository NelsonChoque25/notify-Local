import logoHikvision from "../../assets/img/hikvision_logo.png";
import { formatDate } from "../../utils/DateUtils";
import DataTableBase from "../../utils/DataTable";
import { useEffect, useState } from "react";
import { eventsHv } from "../../api/events";
import { MdApps } from "react-icons/md";

const Home = () => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await eventsHv();
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEventsData();
  }, []);

  const columns = [
    {
      cell: () => <MdApps style={{ fill: "#43a047" }} />,
      width: "50px",
      style: {
        borderBottom: "1px solid #FFFFFF",
        marginBottom: "-1px",
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Event",
      selector: (row) => row.eventType,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => formatDate(row.eventTime),
      sortable: true,
    },
  ];

  return (
    <>
      <img
        className="float-end m-2"
        src={logoHikvision}
        alt="Hikvision"
        width="100"
      />
      <h4 className="text-primary-emphasis m-2">Events Hikvision</h4>

      <DataTableBase
        columns={columns}
        data={eventsData}
        paginationPerPage={5}
        className="shadow"
      />
    </>
  );
};

export default Home;
