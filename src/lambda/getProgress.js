import axios from "axios";

export const getProgress = async (id) => {
    try {
        const result = await axios.get(`http://localhost:3002/showreel/getProgress`, { params: { id } });
        return result.data;
    }
    catch {
        return null
    }
};