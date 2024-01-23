import axios from "./axios";

export const events = async () => {
  const { data } = await axios.get("/events");
  return data;
};

