import { processEmailsCctv } from "../../api/alertCctv";
import { Button } from "react-bootstrap";

const ProcessEmails = () => {
  
    const processEmails = async () => {
      try {
        const data = await processEmailsCctv();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    return (
      <>
        <Button className="my-3 mx-2" onClick={processEmails}>Process emails</Button>
      </>
    );
  }

export default ProcessEmails;