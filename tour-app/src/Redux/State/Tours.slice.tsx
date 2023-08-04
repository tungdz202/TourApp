import { createSlice } from "@reduxjs/toolkit";

const hotTourSlice = createSlice({
  name: "hotTour",
  initialState: {
    hotTour: {
      allHotTour: [
        {
          _id: "",
          name: "",
          imgs: [
            "",
            "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/353394623_293836892999920_8252722835748439789_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=lyRipw-9uA8AX-sOLjt&_nc_ht=scontent.fhan2-4.fna&oh=00_AfBMQrtT4z1_bzNZHj2D2MlefpJFL7M-fKEjfYUQJ-J4AQ&oe=649DBCF5",
          ],
          url: "",
          originalPrice: 0,
          presentPrice: 0,
          time: "",
          vehicle: "",
          highlightDestinations: "",
          departurePoint: "",
          newOriginalPrice: "",
          newPresentPrice: "",
          schedules: [""],
        },
      ],
      listOrigin: [
        {
          origin: "",
          number: 0,
        },
      ],
      tourSearch: [
        {
          _id: "",
          name: "",
          imgs: [
            "",
            "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/353394623_293836892999920_8252722835748439789_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=lyRipw-9uA8AX-sOLjt&_nc_ht=scontent.fhan2-4.fna&oh=00_AfBMQrtT4z1_bzNZHj2D2MlefpJFL7M-fKEjfYUQJ-J4AQ&oe=649DBCF5",
          ],
          url: "",
          presentPrice: 0,
        },
      ],
      isFetching: false,
      errors: false,
    },
  },
  reducers: {
    getHotTourStart: (state) => {
      state.hotTour.isFetching = true;
    },
    getHotTourSuccess: (state, action) => {
      state.hotTour.isFetching = false;
      state.hotTour.allHotTour = action.payload;
      state.hotTour.errors = false;
    },
    getHotTourFailed: (state) => {
      state.hotTour.isFetching = false;
      state.hotTour.errors = true;
    },
    getListOrigin: (state, action) => {
      state.hotTour.listOrigin = action.payload;
    },
    getTourSearch: (state, action) => {
      state.hotTour.tourSearch = action.payload;
    },
  },
});

export const {
  getHotTourStart,
  getHotTourSuccess,
  getHotTourFailed,
  getListOrigin,
  getTourSearch,
} = hotTourSlice.actions;
export default hotTourSlice.reducer;
