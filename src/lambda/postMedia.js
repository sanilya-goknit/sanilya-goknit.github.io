import axios from "axios";

export const postMedia = async (id, inputProps) => {
  try {
    const result = await axios.post(`http://localhost:3002/api/lambda/media`, { id, inputProps });
    return result.data;
  } catch {
    return null;
  }
};
