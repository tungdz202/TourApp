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

export const updateAccountAdmin = async (account: any) => {
  try {
    const res = await http.put("/dashboard/updateAccount", account);
    return res.data;
  } catch (error) {
    console.log("Error");
  }
};

export const deleteAccountAdmin = async (account: any) => {
  try {
    const res = await http.delete("/dashboard/deleteAccount/" + account._id);
    return res.data;
  } catch (error) {
    console.log("Error");
  }
};

export const deleteTourAdmin = async (account: any) => {
  try {
    const res = await http.delete("/dashboard/deleteTour/" + account._id);
    return res.data;
  } catch (error) {
    console.log("Error");
  }
};

export const updateCollection = async () => {
  try {
    const res = await http.post("/collection/updateListCollection");
    return res.data;
  } catch (error) {
    console.log("Error");
  }
};

export const updateTourList = async () => {
  try {
    const res = await http.post("/tour/updateListTour");
    return res.data;
  } catch (error) {
    console.log("Error");
  }
};
