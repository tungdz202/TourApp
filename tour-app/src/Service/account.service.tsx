import http from "../Common/http";
import {
  getAccountFailed,
  getAccountStart,
  getAccountSuccess,
  getListAccounts,
} from "../Redux/State/Account.slice";
import { AccountDetail } from "../types/Account";

export const updateAccount = async (account: any) => {
  try {
    const response = await http.put("/account/update", account);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (oldpassword: any, newpassword: any) => {
  try {
    const response = await http.put("/account/changePassword/", {
      oldpassword: oldpassword,
      newpassword: newpassword,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateHistorySeen = async (tourSeen: any) => {
  try {
    const response = await http.put("/account/updateHistory", {
      name: tourSeen.name,
      url: tourSeen.url,
    });
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

export const getListAccount = async (dispatch: any) => {
  try {
    const response = await http.get("/account/");
    dispatch(getListAccounts(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
