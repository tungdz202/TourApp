import http from "../Common/http";
import {
  getCollectionStart,
  getCollectionSuccess,
  getCollectionFailed,
} from "../Redux/State/Collections.slice";

export const getCollectionbyProvince = async (dispatch: any, province: any) => {
  dispatch(getCollectionStart());
  try {
    const res = await http.post("/collection/province", province);
    dispatch(getCollectionSuccess(res.data));
  } catch (error) {
    dispatch(getCollectionFailed());
  }
};
