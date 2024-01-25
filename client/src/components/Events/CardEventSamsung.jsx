import logoSamsung from "../../assets/img/samsung.png";
import { Row, Col, Card, Form } from "react-bootstrap";
import { lastEventsSamsung } from "../../api/events";
import { formatDate } from "../../utils/DateUtils";
import { useEffect, useState } from "react";

const CardEventSamsung = () => {
  const [eventsData, setEventsData] = useState([]);
  const [eventLimit, setEventLimit] = useState(2);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await lastEventsSamsung(eventLimit);
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEventsData();
  }, [eventLimit]);

  const handleLimitChange = (e) => {
    setEventLimit(e.target.value);
  };

  return (
    <>
      <Row>
        <div className="mb-1">
          <img
            className="float-end mt-2"
            src={logoSamsung}
            alt="Hikvision"
            width="100"
          />
          <h4 className="text-primary-emphasis">Events Samsung</h4>
        </div>

        <Col md={12} className="mb-3">
          <Form.Group as={Row} controlId="eventLimitSelect">
            <Form.Label column sm={6} md={6} lg={6}>
              Number of Events to Display:
            </Form.Label>
            <Col sm={6} md={6} lg={6}>
              <Form.Select value={eventLimit} onChange={handleLimitChange}>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Col>

        {eventsData.map((event, index) => (
          <Col key={index} lg={6} md={12}>
            <Card className="mb-4 shadow bg-blue text-bg-primary p-2 ">
              <Card.Body>
                <Card.Title className="card-title bg-light text-primary px-2 py-1 rounded-3 ">
                  {event.name}
                </Card.Title>
                <Card.Text className="card-text px-2 fs-5">
                  Mac Address: &nbsp;
                  {event.macAddress}
                </Card.Text>
                <Card.Text className="card-text px-2 fs-5">
                  Eventname: &nbsp;
                  {event.eventName && (
                    <ul>
                      {Object.entries(JSON.parse(event.eventName)).map(
                        ([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong>
                            <pre>{value}</pre>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </Card.Text>
                <Card.Text className="card-text px-2">
                  Date: &nbsp;
                  {formatDate(event.dateTime)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CardEventSamsung;
