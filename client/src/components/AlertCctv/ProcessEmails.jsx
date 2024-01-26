import { processEmailsCctv } from "../../api/alertCctv";
import { Button } from "react-bootstrap";
import io from 'socket.io-client';
import { useEffect } from "react";

const ProcessEmails = () => {
  
    const processEmails = async () => {
      try {
        const data = await processEmailsCctv();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      
      const socket = io('http://localhost:5000');
  
      socket.on('connect', () => {
        console.log('Conectado al servidor!');
      });
  
      socket.on('mensaje', (msg) => {
        console.log(msg);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    return (
      <>
        <Button className="my-3 mx-2" onClick={processEmails}>Process emails</Button>
      </>
    );
  }

export default ProcessEmails;