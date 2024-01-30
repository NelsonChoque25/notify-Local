import CardEventSamsung from "../Events/CardEventSamsung";
import TestHikvision from "../Tests/TestHikvision";
import CardEventHv from "../Events/CardEventHv";
import TestSamsung from "../Tests/TestSamsung";
import { Row, Col } from "react-bootstrap";
import { processEmailsTs } from "../../api/teleServices"
import { useEffect, useState } from "react";
import io from "socket.io-client";

 
const Home = () => {

  const [test, setTest] = useState(null)
  const [processedEmails, setProcessedEmails] = useState(0);


  const handleTest = async () => {
    const res = await processEmailsTs()
    console.log(res)
    setTest(res)
  }

  useEffect(() => {
    handleTest()
  }
  ,[])

  
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("totalEmails", (data) => {
      console.log(data);
      setProcessedEmails(data.total);
    });

    socket.on("messageTs", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);



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
          <h2>{ processedEmails  } </h2>
          <h3>{ test }</h3>
        </Col>
      </Row>
    </>
  );
};

export default Home;
