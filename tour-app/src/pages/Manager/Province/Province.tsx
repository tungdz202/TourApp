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
  getListProvince,
  updateProvince,
} from "../../../Service/province.service";
import { useDispatch } from "react-redux";
import { Province } from "../../../types/Province";
// var natural = require("natural");

export default function ProvinceManager() {
  const ListProvince: Province[] = useAppSelector(
    (state) => state.province.province.ListProvince
  );
  const [provinceUpdate, setProvinceUpdate] = useState<Province>();
  const [newProvince, setNewProvince] = useState("");
  const [detailProvince, setDetailProvince] = useState<Province>();
  const dispatch = useDispatch();

  const handleCreateProvince = () => {
    createProvince(dispatch, { name: newProvince });
  };

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleDeleteProvince = (province: Province) => {
    setDetailProvince(province);
    setIsOpenPopup(true);
  };

  const handleUpdateProvince = (province: Province) => {
    updateProvince(dispatch, province);
    setDetailProvince(province);
  };

  useEffect(() => {
    getListProvince(dispatch);
  }, []);

  const param = "province";
  console.log(newProvince);
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
                  onClick={() => handleDeleteProvince(province)}
                >
                  {province.name}
                </div>
              ))}
            </Box>
            {isOpenPopup && (
              <div
                onClick={() => setIsOpenPopup(false)}
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
                    <div> thông tin tỉnh: {detailProvince?.name}</div>
                    <div> số lượt thích: {detailProvince?.like.length}</div>
                    <div>
                      địa điểm nổi tiếng:
                      {detailProvince?.popularAttractions.map((attraction) => (
                        <Box>{attraction}</Box>
                      ))}
                    </div>
                    <button>cập nhật</button>
                    <button>xoá</button>
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
