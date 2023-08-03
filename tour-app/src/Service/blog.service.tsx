import http from "../Common/http";
import { getBlog } from "../Redux/State/Blog.slice";

export const getAllBlog = async (dispatch: any) => {
  try {
    const res = await http.get("/blog/show");
    dispatch(getBlog(res.data));
  } catch (error) {
    console.log(error);
  }
};
