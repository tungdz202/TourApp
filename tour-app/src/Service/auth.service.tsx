import { useDispatch } from "react-redux";
import http from "../Common/http";
import {
  getAccountFailed,
  getAccountStart,
  getAccountSuccess,
} from "../Redux/State/Account.slice";
import { newAccount } from "../types/Account";

export const loginUser = async (user: any) => {
  try {
    const response = await http.post("/account/login", user);
    return response.data;
  } catch (error) {
    alert("Login failed");
    console.log(error);
  }
};

export const registerUser = async (user: any) => {
  try {
    const response = await http.post("/account/register", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetail = async (dispatch: any) => {
  dispatch(getAccountStart());
  try {
    const response = await http.get("/account/profile");
    dispatch(getAccountSuccess(response.data));
  } catch (error) {
    dispatch(getAccountFailed());
  }
};

export const getAccessToken = async () => {
  try {
    const response = await http.get("/account/getAccesstoken");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
