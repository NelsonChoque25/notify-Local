import { removeDuplicateTestHv } from "../../api/events";
import { Button } from "react-bootstrap";

const RemoveDuplicated = () => {

  const removeDuplicated = async () => {
    try {
      const data = await removeDuplicateTestHv();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Button className="my-3 mx-2" onClick={removeDuplicated}>Remove duplicated</Button>
    </>
  );
}

export default RemoveDuplicated;