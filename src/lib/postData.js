import axios from "axios"
import { API_URL } from "../constraint"

const postData = async (url, body) => {
  const data = await axios.post(`${API_URL}${url}`, body);
  return data.data;
}

export default postData;