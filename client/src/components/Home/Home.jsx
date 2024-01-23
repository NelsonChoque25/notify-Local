import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { tests, testsCount } from "../../api/tests";
import { events } from "../../api/events";
import { formatDate } from "../../utils/DateUtils";
import DataTableBase from "../../utils/DataTable";
import { MdApps } from "react-icons/md";
import "./Home.css";

const Home = () => {
  const [testsData, setTestsData] = useState([]);
  const [testsCountData, setTestsCountData] = useState(0);
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchTestsData = async () => {
      try {
        const data = await tests();
        setTestsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTestsData();
  }, []);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await events();
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEventsData();
  }, []);

  useEffect(() => {
    const fetchTestsCount = async () => {
      try {
        const data = await testsCount();
        setTestsCountData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTestsCount();
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
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => formatDate(row.date),
      sortable: true,
    },
  ];

  return (
    <>
      <Row className="justify-content-center">
        <h1 className="text-center text-primary my-2">
          Cameras Configured for Email Notifications (DVRs)
        </h1>
        <h3 className="text-center text-success mb-3">
          Total Cameras: {testsCountData.count}
        </h3>
      </Row>
      <Row>
        <Col lg={6}>
          <Row>
            {eventsData.map((event, index) => (
              <Col key={index} lg={6} md={12}>
                <Card className="mb-4 shadow">
                  <Card.Body>
                    <Card.Title className="card-title text-bg-danger p-1">{event.name}</Card.Title>
                    <Card.Text className="card-text text-primary fs-5">
                      {event.eventType}
                    </Card.Text>
                    <Card.Text className="card-text">
                      {event.cameraName}
                    </Card.Text>
                    <Card.Text className="card-text date">
                      {formatDate(event.eventTime)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col lg={6}>
          <DataTableBase columns={columns} data={testsData} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
