import CardEventSamsung from "../Events/CardEventSamsung";
import CardEventHv from "../Events/CardEventHv";
import { Row, Col } from "react-bootstrap";
import TestHv from "../Tests/TestHv";
import TestSamsung from "../Tests/TestSamsung";
import "./Home.css";

const Home = () => {
  
  return (
    <>
      <Row>
        <Col lg={6}>
          <CardEventHv />
          <TestHv/>
        </Col>
        <Col lg={6}>
          <CardEventSamsung />
          <TestSamsung/>
        </Col>
      </Row>
    </>
  );
};

export default Home;
