import axios from "src/api/axios";

export const fetchAllDoctors = async () => {
  const response = await axios.get("api/v1/hospital/doctors");
  return response.data;
};
