import { createSlice } from "@reduxjs/toolkit";

const CompareTourSlice = createSlice({
  name: "compareTour",
  initialState: {
    ListTour: {
      listCompareTour: [
        // {
        //   id: String,
        //   name: String,
        //   imgs: [String],
        //   url: String,
        //   originalPrice: Number,
        //   presentPrice: Number,
        //   time: String,
        //   vehicle: String,
        //   highlightDestinations: String,
        //   schedules: [String],
        // },
      ],
      isFetching: false,
      errors: false,
    },
  },
  reducers: {
    getCompareTourStart: (state) => {
      state.ListTour.isFetching = true;
    },
    getCompareTourSuccess: (state, action) => {
      state.ListTour.isFetching = false;
      state.ListTour.listCompareTour = action.payload;
      state.ListTour.errors = false;
    },
    getCompareTourFailed: (state) => {
      state.ListTour.isFetching = false;
      state.ListTour.errors = true;
    },
  },
});

export const {
  getCompareTourStart,
  getCompareTourSuccess,
  getCompareTourFailed,
} = CompareTourSlice.actions;
export default CompareTourSlice.reducer;
