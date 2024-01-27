import RemoveDuplicated from "../AlertCctv/RemoveDuplicated";
import ProcessEmails from "../AlertCctv/ProcessEmails";
import { Row, Col, Card } from "react-bootstrap";
import EventSamsung from "./EventSamsung";
import EventHv from "./EventHv";
import "./Events.css"; 

const Events = () => {
  return (
    <>
      <Row className="my-5 mx-2">
        <Col lg={2} className="sidebar-divider mt-2">
          { /*  Process Emails*/}
          <h5 className="text-success"> Process Emails</h5>
          <Card className="bg-success bg-opacity-10 text-success border-0 shadow-sm">
            <Card.Body className="pt-4">
              <Card.Text>
                En esta sección se pueden procesar los correos de los
                eventos generados por los DVRs.
              </Card.Text>
              <ProcessEmails />
            </Card.Body>
          </Card>
          { /*  Remove Duplicated*/}
          <h5 className="text-primary mt-5"> Remove Duplicated</h5>
          <Card className="bg-primary bg-opacity-10 text-primary border-0 shadow-sm">
            <Card.Body className="pt-4">
              <Card.Text>
                En esta sección se pueden eliminar los Tests duplicados.
              </Card.Text>
              <RemoveDuplicated />
            </Card.Body>
          </Card>
        </Col>
        {/*  Events*/}
        <Col lg={10}>
          <EventHv />
          <hr />
          <EventSamsung />
        </Col>
      </Row>
    </>
  );
};

export default Events;
