import axios from "./axios";

export const tests = async () => {
  const { data } = await axios.get("/tests");
  return data;
};

export const testsCount = async () => {
  const { data } = await axios.get("/tests/counts");
  return data;
}
