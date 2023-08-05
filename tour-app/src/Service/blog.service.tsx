import http from "../Common/http";
import { getBlog } from "../Redux/State/Blog.slice";

export const getlistBlog = async (dispatch: any) => {
  try {
    const res = await http.get("/blog/show");
    dispatch(getBlog(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlog = async (dispatch: any) => {
  try {
    const res = await http.get("/blog/");
    dispatch(getBlog(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = async (blog: any) => {
  try {
    const res = await http.put("/blog/update/", blog);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (blog: any) => {
  try {
    const res = await http.delete("/blog/delete/" + blog._id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const crawlBlog = async () => {
  try {
    const res = await http.post("/blog/CrawlBlog/");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
