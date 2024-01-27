import { Button, ProgressBar, Alert } from "react-bootstrap";
import { processEmailsCctv } from "../../api/alertCctv";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";

const ProcessEmails = () => {
  const [processedEmails, setProcessedEmails] = useState(0);
  const [totalEmails, setTotalEmails] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const processEmails = async () => {
    setTotalEmails(0);
    setProcessedEmails(0);

    try {
      const data = await processEmailsCctv();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error al procesar los correos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("emailProcessed", (data) => {
      console.log(`Correo procesado: ${data.uid}, ${data.subject}`);
      setProcessedEmails((prev) => prev + 1);
    });

    socket.on("totalEmailsToProcess", (data) => {
      if (data.total === 0) {
        setIsLoading(false);
        toast.info("No hay correos para procesar");
      } else {
        setIsLoading(true);
      }

      setTotalEmails(data.total);
    });

    socket.on("allEmailsProcessed", () => {
      setIsLoading(false);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="d-grid gap-2">
        <Button
          className="my-3 mx-2 "
          onClick={processEmails}
          disabled={isLoading}
          variant="success"
        >
          Process emails
        </Button>
      </div>
      {isLoading && (
        <ProgressBar
          now={(processedEmails / totalEmails) * 100}
          label={`${processedEmails}/${totalEmails}`}
          striped
          animated
          variant="success"
        />
      )}
       {showAlert && <Alert className="border-0 shadow-sm" variant="success">Proceso de correos finalizado</Alert>}
    </>
  );
};

export default ProcessEmails;
