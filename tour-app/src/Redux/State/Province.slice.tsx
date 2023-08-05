import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

const ProvinceSlice = createSlice({
  name: "province",
  initialState: {
    province: {
      provinceSearch: [
        {
          _id: "",
          name: "",
          sumTour: 0,
        },
      ],
      province: {
        name: "Hà Nội",
      },
      ListProvince: [
        {
          _id: "",
          name: "",
          like: [""],
          popularAttractions: [""],
        },
      ],
      provinceUpdate: {
        _id: "",
        name: "",
        like: [""],
        popularAttractions: [""],
      },

      isFetching: false,
      errors: false,
    },
    creatProvince: {
      isFetching: false,
      errors: false,
      success: false,
    },
    updateProvince: {
      isFetching: false,
      errors: false,
      success: false,
    },
  },
  reducers: {
    getProvinceStart: (state) => {
      state.province.isFetching = true;
    },
    getProvinceSuccess: (state, action) => {
      state.province.isFetching = false;
      state.province.province = action.payload;
      state.province.errors = false;
    },
    getProvinceFailed: (state) => {
      state.province.isFetching = false;
      state.province.errors = true;
    },
    getListProvinceStart: (state) => {
      state.province.isFetching = true;
    },
    getListProvinceSuccess: (state, action) => {
      state.province.isFetching = false;
      state.province.ListProvince = action.payload;
      state.province.errors = false;
    },
    getListProvinceFailed: (state) => {
      state.province.isFetching = false;
      state.province.errors = true;
    },
    createProvinceStart: (state) => {
      state.creatProvince.isFetching = true;
    },
    createProvinceSuccess: (state) => {
      state.creatProvince.isFetching = false;
      state.creatProvince.success = true;
      state.creatProvince.errors = false;
    },
    createProvinceFailed: (state) => {
      state.creatProvince.success = false;
      state.creatProvince.errors = true;
    },
    updateProvinceStart: (state) => {
      state.updateProvince.isFetching = true;
    },
    updateProvinceSuccess: (state) => {
      state.updateProvince.isFetching = false;
      state.updateProvince.success = true;
      state.updateProvince.errors = false;
    },
    updateProvinceFailed: (state) => {
      state.updateProvince.success = false;
      state.updateProvince.errors = true;
    },
    getProvinceSearch: (state, action) => {
      state.province.provinceSearch = action.payload;
    },
    setProvinceUpdate: (state, action) => {
      state.province.provinceUpdate = action.payload;
    },
  },
});

export const {
  getProvinceStart,
  getProvinceSuccess,
  getProvinceFailed,
  getListProvinceStart,
  getListProvinceSuccess,
  getListProvinceFailed,
  createProvinceStart,
  createProvinceSuccess,
  createProvinceFailed,
  updateProvinceStart,
  updateProvinceSuccess,
  updateProvinceFailed,
  getProvinceSearch,
  setProvinceUpdate,
} = ProvinceSlice.actions;
export default ProvinceSlice.reducer;
