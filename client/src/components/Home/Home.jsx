import ProcessEmails from "../AlertCctv/ProcessEmails";
import CardEventSamsung from "../Events/CardEventSamsung";
import RemoveDuplicated from "../Tests/RemoveDuplicated";
import CardEventHv from "../Events/CardEventHv";
import TestSamsung from "../Tests/TestSamsung";
import { Row, Col } from "react-bootstrap";
import TestHv from "../Tests/TestHv";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Row>
        <Col lg={6}>
          <CardEventHv />
          <TestHv />
        </Col>
        <Col lg={6}>
          <CardEventSamsung />
          <TestSamsung />
        </Col>
        <Col lg={12}>
          <RemoveDuplicated />
          <ProcessEmails />
        </Col>
      </Row>
    </>
  );
};

export default Home;
