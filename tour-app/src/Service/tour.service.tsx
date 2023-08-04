import axios from "axios";
import http from "../Common/http";
import {
  getHotTourFailed,
  getHotTourStart,
  getHotTourSuccess,
  getListOrigin,
  getTourSearch,
} from "../Redux/State/Tours.slice";
import { getProvinceSearch } from "../Redux/State/Province.slice";

export const getHotTour2 = async (dispatch: any) => {
  dispatch(getHotTourStart());
  try {
    const res = await http.get("/tour/");
    dispatch(getHotTourSuccess(res.data));
  } catch (error) {
    dispatch(getHotTourFailed());
  }
};

export const getAllTour = async (dispatch: any) => {
  dispatch(getHotTourStart());
  try {
    const res = await http.get("/tour/showall");
    dispatch(getHotTourSuccess(res.data));
  } catch (error) {
    dispatch(getHotTourFailed());
  }
};

export const getTourbyProvince = async (dispatch: any, province: any) => {
  dispatch(getHotTourStart());
  try {
    const res = await http.post("/tour/province", province);
    dispatch(getHotTourSuccess(res.data));
  } catch (error) {
    dispatch(getHotTourFailed());
  }
};

export const SearchTourbyProvince = async (dispatch: any, province: any) => {
  try {
    const tour = await http.post("/tour/province", province);
    dispatch(getTourSearch(tour.data));
    const provinces = await http.post("/province/search", province);
    dispatch(getProvinceSearch(provinces.data));
  } catch (error) {
    dispatch(getHotTourFailed());
  }
};

export const getWeather = async (province: any) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=4fa4bb0d7d8f4a6cb6a130142230308&q=${province}&days=7`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTourByOrigin = async (dispatch: any) => {
  let list = [];
  for (origin of listOrigin) {
    try {
      const tour = await http.post("/tour/origin", {
        origin: origin,
      });
      const originDetail = {
        origin: origin,
        number: tour.data.length,
      };
      list.push(originDetail);
    } catch (error) {
      console.log(error);
    }
  }
  dispatch(getListOrigin(list));
};

export const getTourByOrigin2 = async () => {
  let list = [];
  for (origin of listOrigin) {
    try {
      const tour = await http.post("/tour/origin", {
        origin: origin,
      });
      const originDetail = {
        origin: origin,
        number: tour.data.length,
      };
      list.push(originDetail);
    } catch (error) {
      console.log(error);
    }
  }
  return list;
};

const listOrigin = [
  "VietnamBooking",
  "IVIVU",
  "Travel",
  "DulichViet",
  "Saigontourist",
  "Viettourist",
];
