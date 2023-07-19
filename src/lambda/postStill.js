import axios from "axios";

export const postStill = async (id, inputProps) => {
  try {
    const result = await axios.post(`http://localhost:3002/api/lambda/still`, { id, inputProps });
    return result.data;
  } catch {
    return null;
  }
};
