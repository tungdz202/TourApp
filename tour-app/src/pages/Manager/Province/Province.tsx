import {
  Box,
  Button,
  List,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import { useAppSelector } from "../../../Redux/store";
import { useEffect, useState } from "react";
import {
  createProvince,
  deleteProvince,
  getListProvince,
  updateProvince,
} from "../../../Service/province.service";
import { useDispatch } from "react-redux";
import { Province } from "../../../types/Province";
import ButtonChangePass from "../../../components/ButttonCustom/ButtonChangePass/ButtonChangePass";
import ButtonSubmit from "../../../components/ButttonCustom/ButtonSubmit/ButtonSubmit";
import { setProvinceUpdate } from "../../../Redux/State/Province.slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// var natural = require("natural");

export default function ProvinceManager() {
  const ListProvince: Province[] = useAppSelector(
    (state) => state.province.province.ListProvince
  );
  const ProvinceUpdate: Province = useAppSelector(
    (state) => state.province.province.provinceUpdate
  );
  //để mỗi lần cập nhật thì gọi lại danh sách tour
  const [isTrue, setIsTrue] = useState(false);
  const toggleValue = () => {
    setIsTrue((prevState) => !prevState);
  };

  const [newProvince, setNewProvince] = useState<string>();
  const [detailProvince, setDetailProvince] = useState<Province>();
  const dispatch = useDispatch();

  const [popularAttraction, setpopularAttraction] = useState<string>("");
  const handleSetProvinceUpdate = (province: Province) => {
    dispatch(setProvinceUpdate(province));
  };

  //tạo tỉnh mới
  const [provincename, setProvincename] = useState<string>();
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvincename(event.target.value);
  };
  const handleCreateProvince = async () => {
    if (newProvince != null) {
      const res = await createProvince(dispatch, { name: newProvince });
      if (res == "đã tồn tại tour") {
        toast.warn("Đã tồn tại tỉnh", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.success("Thêm tour thành công", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.warn("Hãy nhập tên tỉnh thành", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    toggleValue();
  };

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectProvince = (province: Province) => {
    setDetailProvince(province);
    setProvincename(province.name);
    setIsOpenPopup(true);
  };

  //hàm thêm địa điểm nổi tiếng
  const handleAddPopularAttraction = async () => {
    const newPopularAttraction = [...ProvinceUpdate.popularAttractions];
    var exist = false;
    if (newPopularAttraction) {
      for (const popular of newPopularAttraction) {
        if (popular == popularAttraction) exist = true;
      }
    }
    if (exist) {
      toast.warn("Địa điểm đã tồn tại", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setpopularAttraction("");
    } else {
      newPopularAttraction.push(popularAttraction);
      let provinceNew = {
        _id: ProvinceUpdate._id,
        name: ProvinceUpdate.name,
        like: ProvinceUpdate.like,
        popularAttractions: newPopularAttraction,
      };
      dispatch(setProvinceUpdate(provinceNew));
      setpopularAttraction("");
      if (popularAttraction != "") {
        const res = await updateProvince(provinceNew);
        if (res == "cập nhật thành công") {
          toast.success("Cập nhật thành công", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      }
    }
    toggleValue();
  };
  //hàm cập nhật tên tỉnh
  const handleUpdateProvinceName = async () => {
    const provinceNew = {
      _id: detailProvince?._id,
      name: provincename,
    };
    console.log(provinceNew);
    const res = await updateProvince(provinceNew);
    if (res == "cập nhật thành công") {
      toast.success("Xoá thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    toggleValue();
  };
  //hàm xoá tỉnh
  const handleDeleteProvince = async () => {
    const res = await deleteProvince(detailProvince);
    if (res == "xoá thành công") {
      toast.success("Xoá thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    setIsOpenPopup(false);
    toggleValue();
  };

  //hàm xoá địa điểm nổi bật
  const handleDeletePopularAttraction = async (popularAttraction: string) => {
    const ListPopularAttraction = ProvinceUpdate.popularAttractions.filter(
      (item) => item !== popularAttraction
    );
    const newProvince = {
      _id: ProvinceUpdate._id,
      name: ProvinceUpdate.name,
      like: ProvinceUpdate.like,
      popularAttractions: ListPopularAttraction,
    };
    dispatch(setProvinceUpdate(newProvince));
    setIsOpen(true);
  };

  const handleDeletePopularAttractionConfirm = async () => {
    const res = await updateProvince(ProvinceUpdate);
    if (res == "cập nhật thành công") {
      toast.success("Xoá thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    toggleValue();
  };

  useEffect(() => {
    getListProvince(dispatch);
  }, [isTrue]);

  const param = "province";

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", height: "120vh" }}>
      <HeaderAdmin />
      <SideBar param={param} />
      <ToastContainer />
      <Box
        sx={{
          height: "auto",
          width: "1150px",
          margin: "120px 0px 0px 340px",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Typography variant="h5" fontWeight={550} sx={{ marginBottom: "40px" }}>
          Province
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ width: "600px" }}>
            <Typography variant="h6" marginLeft={"30px"}>
              Danh sách các tỉnh thành:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", width: "550px" }}>
              {ListProvince.map((province) => (
                <div
                  key={province._id}
                  style={{
                    padding: "3px 8px 3px 8px",
                    margin: "2px",
                    background: "#FFFFFF",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleSelectProvince(province)}
                >
                  {province.name}
                </div>
              ))}
            </Box>
            {isOpenPopup && (
              <div
                style={{
                  position: "fixed",
                  background: "rgba(255,255,255,0.5)",
                  paddingTop: "0px",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Box
                  sx={{
                    maxHeight: "600px",
                    maxWidth: "1200px",
                    height: "auto",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#FFFFFF",
                    boxShadow: "1px 2px 5px 2px #828282",
                    borderRadius: "8px",
                    overflow: "auto",
                  }}
                >
                  <Box sx={{ padding: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: "30px",
                        minHeight: "45px",
                      }}
                    >
                      <Typography sx={{ width: "140px" }}>
                        {" "}
                        Tên tỉnh:{" "}
                      </Typography>
                      <Box
                        sx={{
                          background: "#FFE5BE",
                          color: "rgba(34,49,63,0.6)",
                          borderRadius: "5px",
                          minHeight: "35px",
                          padding: "5px",
                          width: "250px",
                        }}
                      >
                        <input
                          type="text"
                          value={provincename}
                          onChange={handleChangeName}
                          style={{
                            fontSize: "15px",
                            color: "rgba(34,49,63,0.6)",
                          }}
                        />
                      </Box>
                    </div>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: "30px",
                        minHeight: "40px",
                      }}
                    >
                      <Typography sx={{ width: "140px" }}>
                        Số lượt thích:
                      </Typography>
                      {detailProvince?.like.length}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: "30px",
                        marginBottom: "10px",
                        minHeight: "40px",
                      }}
                    >
                      <Typography sx={{ width: "140px" }}>
                        Địa điểm nổi tiếng:
                      </Typography>
                      {detailProvince?.popularAttractions.length}
                    </Box>

                    <Box
                      sx={{
                        height: "60px",
                        width: "450px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{ margin: "0px 10px" }}
                        onClick={() => setIsOpenPopup(false)}
                      >
                        <ButtonChangePass text={"Huỷ bỏ"} />
                      </div>
                      <div
                        style={{ margin: "0px 10px" }}
                        onClick={() => handleUpdateProvinceName()}
                      >
                        <ButtonSubmit text={"Cập nhật"} />
                      </div>
                      <div
                        style={{ margin: "0px 10px" }}
                        onClick={() => handleDeleteProvince()}
                      >
                        <ButtonChangePass text={"Xoá Tỉnh"} />
                      </div>
                    </Box>
                  </Box>
                  {/* <Box>thêm tour</Box> */}
                </Box>
              </div>
            )}
          </Box>
          <Box>
            <Box sx={{ height: "100px" }}>
              <Typography variant="h6" marginLeft={"10px"}>
                Thêm mới tỉnh thành
              </Typography>
              <Box sx={{ margin: "10px 0px 0px 7px" }}>
                <TextField
                  sx={{ width: "300px" }}
                  id="outlined-basic"
                  label="Tên Tỉnh thành"
                  variant="outlined"
                  size="small"
                  onChange={(e) => setNewProvince(e.target.value)}
                />
                <Button onClick={() => handleCreateProvince()}>Thêm</Button>
              </Box>
            </Box>
            <Typography variant="h6" marginLeft={"10px"}>
              Thêm các địa điểm nổi tiếng tại
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-select-currency"
                  select
                  helperText="Chọn tỉnh thành"
                  size="small"
                >
                  {ListProvince.map((province) => (
                    <MenuItem
                      value={province.name}
                      onClick={() => handleSetProvinceUpdate(province)}
                    >
                      {province.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
            <Box
              sx={{
                margin: "10px 0px 0px 7px",
              }}
            >
              <TextField
                sx={{ width: "300px" }}
                id="outlined-basic"
                label="Địa điểm yêu thích"
                variant="outlined"
                size="small"
                value={popularAttraction}
                onChange={(e) => setpopularAttraction(e.target.value)}
              />
              <Button onClick={() => handleAddPopularAttraction()}>Thêm</Button>
              <Box sx={{ display: "flex", flexWrap: "wrap", width: "300px" }}>
                {ProvinceUpdate?.popularAttractions.map((popularAttraction) => (
                  <div
                    key={popularAttraction}
                    onClick={() =>
                      handleDeletePopularAttraction(popularAttraction)
                    }
                    style={{
                      padding: "3px 8px 3px 8px",
                      margin: "2px",
                      background: "#FFFFFF",
                      borderRadius: "5px",
                    }}
                  >
                    {popularAttraction}
                  </div>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              background: "rgba(255,255,255,0.5)",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                height: "auto",
                width: "350px",
                display: "flex",
                background: "#FFFFFF",
                boxShadow: "1px 2px 5px 2px #828282",
                borderRadius: "8px",
                flexDirection: "column",
                padding: "15px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  height: "40px",
                  width: "auto",
                }}
              >
                Xác nhận xoá địa điểm yêu thích !
              </Typography>

              <Box
                sx={{
                  height: "80px",
                  width: "300px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{ margin: "10px" }}
                  onClick={() => setIsOpen(false)}
                >
                  <ButtonChangePass text={"Huỷ bỏ"} />
                </div>
                <div
                  style={{ margin: "10px" }}
                  onClick={() => handleDeletePopularAttractionConfirm()}
                >
                  <ButtonChangePass text={"Xác nhận"} />
                </div>
              </Box>
            </Box>
          </div>
        )}
      </Box>
    </Box>
  );
}
