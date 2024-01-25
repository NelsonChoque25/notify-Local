import axios from "./axios";

export const eventsHv = async () => {
  const { data } = await axios.get("/events/hv");
  return data;
}

export const eventsSamsung = async () => {
  const { data } = await axios.get("/events/samsung");
  return data;
}

export const lastEventsHv = async (limit = 5) => {
  const { data } = await axios.get(`/events/hv/last?limit=${limit}`);
  return data;
}

export const lastEventsSamsung = async (limit = 5) => {
  const { data } = await axios.get(`/events/samsung/last?limit=${limit}`);
  return data;
}

export const removeDuplicateTestHv = async () => {
  const { data } = await axios.get("/tests/hv/duplicates");
  return data;
}