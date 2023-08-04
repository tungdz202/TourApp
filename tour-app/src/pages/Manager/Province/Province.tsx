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
// var natural = require("natural");

export default function ProvinceManager() {
  const ListProvince: Province[] = useAppSelector(
    (state) => state.province.province.ListProvince
  );
  const [provinceUpdate, setProvinceUpdate] = useState<Province>();
  const [newProvince, setNewProvince] = useState("");
  const [detailProvince, setDetailProvince] = useState<Province>();
  const dispatch = useDispatch();

  const [provincename, setProvincename] = useState<string>();
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvincename(event.target.value);
  };

  const handleCreateProvince = () => {
    createProvince(dispatch, { name: newProvince });
  };

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleSelectProvince = (province: Province) => {
    setDetailProvince(province);
    setProvincename(province.name);
    setIsOpenPopup(true);
  };

  const handleUpdateProvinceName = async () => {
    const provinceNew = {
      _id: detailProvince?._id,
      name: provincename,
    };
    console.log(provinceNew);
    const res = await updateProvince(provinceNew);
    if (res) alert(res);
  };

  const handleDeleteProvince = async () => {
    const res = await deleteProvince(detailProvince);
    if (res) alert(res);
  };

  useEffect(() => {
    getListProvince(dispatch);
  }, []);

  const param = "province";

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", height: "120vh" }}>
      <HeaderAdmin />
      <SideBar param={param} />
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
                      onClick={() => setProvinceUpdate(province)}
                    >
                      {province.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
            <Box sx={{ margin: "10px 0px 0px 7px" }}>
              <TextField
                sx={{ width: "300px" }}
                id="outlined-basic"
                label="Địa điểm yêu thích"
                variant="outlined"
                size="small"
              />
              <Button>Thêm</Button>
              {provinceUpdate?.popularAttractions.map((popularAttraction) => (
                <MenuItem value={popularAttraction}>
                  {popularAttraction}
                </MenuItem>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

interface Data {
  name: string;
}

function createData(name: string): Data {
  return { name };
}
