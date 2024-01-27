import logoHikvision from "../../assets/img/hikvision_logo.png";
import { formatDate } from "../../utils/DateUtils";
import DataTableBase from "../../utils/DataTable";
import { eventsSamsung } from "../../api/events";
import { useEffect, useState } from "react";
import { MdApps } from "react-icons/md";

const EventSamsung = () => {

  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await eventsSamsung();
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
      selector: (row) => row.macAddress,
      sortable: true,
    },
    {
      name: "Event",
      selector: (row) => row.eventName,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => formatDate(row.dateTime),
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
      <h4 className="text-primary-emphasis m-2">Events Samsung</h4>

      <DataTableBase
        columns={columns}
        data={eventsData}
        pagination
        highlightOnHover
        responsive
      />
    </>
  );

}

export default EventSamsung;