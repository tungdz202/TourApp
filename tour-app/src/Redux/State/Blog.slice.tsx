import { createSlice } from "@reduxjs/toolkit";

const BlogSlice = createSlice({
  name: "hotTour",
  initialState: {
    blog: {
      ListBlog: [
        {
          _id: "",
          name: "",
          description: "",
          url: "",
          img: "",
        },
      ],
    },
  },
  reducers: {
    getBlog: (state, action) => {
      state.blog.ListBlog = action.payload;
    },
  },
});

export const { getBlog } = BlogSlice.actions;
export default BlogSlice.reducer;
