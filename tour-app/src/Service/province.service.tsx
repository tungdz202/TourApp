import { inflateRaw } from "zlib";
import http from "../Common/http";
import { Province } from "../types/Province";
import {
  createProvinceFailed,
  createProvinceStart,
  createProvinceSuccess,
  getListProvinceFailed,
  getListProvinceStart,
  getListProvinceSuccess,
} from "../Redux/State/Province.slice";

export const getListProvince = async (dispatch: any) => {
  dispatch(getListProvinceStart());
  try {
    const res = await http.get("/province/");
    dispatch(getListProvinceSuccess(res.data));
  } catch (error) {
    dispatch(getListProvinceFailed());
  }
};

export const createProvince = async (dispatch: any, province: any) => {
  dispatch(createProvinceStart());
  try {
    const res = await http.post("/province/create", province);
    if (res.data == "thêm thành công") {
      dispatch(createProvinceSuccess(res.data));
    }
    alert(res.data);
  } catch (error) {
    dispatch(createProvinceFailed());
  }
};

export const updateProvince = async (province: any) => {
  try {
    const res = await http.put("/province/update/" + province._id, province);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error");
  }
};

export const deleteProvince = async (province: any) => {
  try {
    const res = await http.delete("/province/delete/" + province._id);
    return res.data;
  } catch (error) {
    console.log("Error");
  }
};

export const getTopProvince = async () => {
  try {
    const res = await http.get("/province/topProvince");

    return res.data;
  } catch (error) {
    console.log("Error");
  }
};
