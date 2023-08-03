import axios from "axios";
import http from "../Common/http";

export const getOverAll = async () => {
  try {
    const res = await http.get("/dashboard/overall");
    return res.data;
  } catch (error) {
    console.log("Error");
  }
};
