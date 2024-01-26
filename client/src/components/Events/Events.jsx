import ProcessEmails from "../AlertCctv/ProcessEmails";
import EventSamsung from "./EventSamsung";
import EventHv from "./EventHv";
import { Row, Col } from "react-bootstrap";

const Events = () => {
  return (
    <>
      <Row className="my-5 mx-2">
        <Col lg={12}>
          <ProcessEmails />
        </Col>
        <Col md={6}>
          <EventHv />
        </Col>
        <Col md={6}>
          <EventSamsung />
        </Col>
      </Row>
    </>
  );
};

export default Events;
