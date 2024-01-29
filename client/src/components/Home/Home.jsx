import CardEventSamsung from "../Events/CardEventSamsung";
import TestHikvision from "../Tests/TestHikvision";
import CardEventHv from "../Events/CardEventHv";
import TestSamsung from "../Tests/TestSamsung";
import { Row, Col } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Row className="my-5 mx-2">
        <Col lg={6}>
          <CardEventHv />
          <hr />
          <TestHikvision/>
        </Col>
        <Col lg={6}>
          <CardEventSamsung />
          <hr />
          <TestSamsung/>
        </Col>
      </Row>
    </>
  );
};

export default Home;
