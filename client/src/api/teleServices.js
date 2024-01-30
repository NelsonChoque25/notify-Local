import axios from "./axios";


//process-emails-ts
export const processEmailsTs = async () => {
  try {
    const response = await axios.get("/process-emails-ts");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



