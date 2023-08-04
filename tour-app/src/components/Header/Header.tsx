import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { Button, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { logo, slogent } from "../../public/img/index";
import Cookies from "js-cookie";
import { AccountDetail } from "../../types/Account";
import { useAppSelector } from "../../Redux/store";
import { getAccessToken, getUserDetail } from "../../Service/auth.service";
import { useDispatch } from "react-redux";
import { SearchTourbyProvince } from "../../Service/tour.service";
import { ProvinceSearch } from "../../types/Province";
import { TourSearch } from "../../types/TourCompare";
import { getProvinceSuccess } from "../../Redux/State/Province.slice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginRight: theme.spacing(5),
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "20px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (province: any) => {
    dispatch(getProvinceSuccess({ name: province }));
    navigate("/tour");
  };

  let Province: ProvinceSearch[] = useAppSelector(
    (state) => state.province.province.provinceSearch
  );

  let ListTourSearch: TourSearch[] = useAppSelector(
    (state) => state.hotTour.hotTour.tourSearch
  );

  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const typingTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleSearchTermChande = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      SearchTourbyProvince(dispatch, { province: searchTerm });
      setIsOpenPopup(true);
    }, 1000);
  };

  //lấy thông tin user lưu trong redux
  let Account: AccountDetail = useAppSelector(
    (state) => state.account.account.account
  );

  const getAccesstokenFromCookie = () => {
    const userCookie = Cookies.get("accesstoken");
    return userCookie ? userCookie : null;
  };

  const getRefreshTokenFromCookie = () => {
    const token = Cookies.get("refreshtoken");
    return token ? token : null;
  };

  var accessToken = getAccesstokenFromCookie();
  var refreshtoken = getRefreshTokenFromCookie();

  const checkUser = async () => {
    if (accessToken) {
      getUserDetail(dispatch);
    } else if (refreshtoken) {
      const res = await getAccessToken();
      if (res != "bạn cần login") {
        Cookies.set("accesstoken", res, {
          expires: 1 / 24,
        });
        getUserDetail(dispatch);
      }
    }
  };

  React.useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = () => {
    Cookies.remove("accesstoken");
    Cookies.remove("refreshtoken");
    window.location.reload();
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const OpenProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem>{user}</MenuItem> */}
      <MenuItem onClick={OpenProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ position: "sticky", top: -1, zIndex: 3 }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"90px"}
        sx={{
          backgroundColor: "rgba(255, 255, 255,0.9)",
          color: "black",
          position: "sticky",
          boxShadow: "rgba(0, 0, 0, 0.05) 0 3px 3px",
          width: "1920px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box width="1400px" margin="auto" display="flex" alignItems="center">
          <Box
            sx={{ "&:hover": { cursor: "pointer" } }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              sx={{
                color: "#3BB1EE",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "rgba(255,255,255, 0.15)",
                borderRadius: "5px",
                height: "45px",
                marginRight: "30px",
                alignItems: "center",
              }}
            >
              <Box>
                <a href="/">
                  <img src={logo} alt="logo" height={"60px"} width={"60px"} />
                </a>
              </Box>
              <Box sx={{ marginLeft: "30px" }}>
                <a>
                  <img
                    src={slogent}
                    alt="logo"
                    height={"45px"}
                    width={"165px"}
                  />
                </a>
              </Box>
            </Box>

            <Search sx={{ marginLeft: "0px" }}>
              <StyledInputBase
                type="text"
                placeholder="Tìm kiếm..."
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchTermChande}
              />
              <Button onClick={() => setIsOpenPopup(true)}>
                <SearchIcon
                  sx={{ color: "#C0C0C0", fontSize: "22px", fontWeight: 300 }}
                />
              </Button>
            </Search>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            columnGap="10px"
            zIndex="2"
            sx={{ color: "#EE1289", fontWeight: "550" }}
          >
            <IconButton
              sx={{
                color: "#3BB1EE",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <PhoneInTalkIcon sx={{ color: "#00CD00" }} />
              <Box sx={{ marginLeft: "5px", color: "#00CD00" }}>
                <Typography fontSize={11} display={"flex"} lineHeight={1}>
                  Hotline
                </Typography>
                <Typography fontSize={11} fontWeight={600}>
                  078912638
                </Typography>
              </Box>
            </IconButton>
            {Account.username == "" ? (
              <IconButton
                size="large"
                edge="end"
                sx={{
                  color: "#3BB1EE",
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255, 0.15)",
                  height: "45px",
                }}
                href="/login"
              >
                <AccountCircleOutlinedIcon sx={{ color: "#F4C201" }} />

                {/* <Typography fontSize={11}>Đăng nhập</Typography>
                  <Typography fontSize={11} display={"flex"}>
                    Đăng kí
                  </Typography> */}
                <Box marginLeft={"6px"}>
                  <Typography
                    fontSize={13}
                    lineHeight={1}
                    sx={{ color: "#F4C201" }}
                  >
                    Tài khoản
                  </Typography>
                </Box>
              </IconButton>
            ) : (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{
                  color: "#3BB1EE",
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255, 0.15)",
                }}
              >
                <Box>
                  <img
                    src={Account.avatar}
                    width={"35px"}
                    height={"35px"}
                    style={{ borderRadius: "50%" }}
                  />
                </Box>
                <Typography fontSize={13} sx={{ marginLeft: "5px" }}>
                  {Account.username}
                </Typography>
              </IconButton>
            )}
          </Box>
        </Box>
        {renderMenu}
        {isOpenPopup && (
          <div
            onClick={() => setIsOpenPopup(false)}
            style={{
              position: "fixed",
              paddingTop: "140px",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 3,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Box
              sx={{
                minHeight: "100px",
                maxHeight: "400px",
                width: "600px",
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
              <Box
                sx={{
                  width: "600px",
                  maxHeight: "600px",
                  minHeight: "100px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "250px",
                    height: "40px",
                  }}
                >
                  <Typography sx={{ fontSize: "18px" }}>
                    Danh sách các tỉnh thành:
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "500px",
                    maxHeight: "300px",
                    minHeight: "100px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTop: "1px solid black",
                  }}
                >
                  {Province?.map((p) => (
                    <div
                      onClick={() => handleNavigate(p.name)}
                      key={p._id}
                      style={{
                        width: "120px",
                        height: "50px",
                        padding: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: "16px",
                          fontWeight: "550",
                          color: "#222222",
                        }}
                      >
                        {p.name}
                      </Box>
                      <Box
                        sx={{
                          padding: "0px 3px",
                          fontSize: "12px",
                          color: "#444444",
                          fontWeight: "550",
                        }}
                      >
                        {p.sumTour} tour
                      </Box>
                    </div>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  width: "600px",
                  maxHeight: "200px",
                  minHeight: "50px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                <Box
                  sx={{
                    width: "200px",
                    height: "50px",
                  }}
                >
                  <Typography>Danh sách Tour du lịch:</Typography>
                </Box>
                <Box
                  sx={{
                    width: "500px",

                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTop: "1px solid black",
                  }}
                >
                  {ListTourSearch?.map((tour) => (
                    <a
                      href={tour.url}
                      key={tour.url}
                      style={{
                        width: "500px",
                        height: "60px",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row",
                        margin: "5px",
                        textDecoration: "none",
                        color: "transparent",
                      }}
                    >
                      <img
                        src={tour.imgs[0]}
                        width={"50px"}
                        height={"50px"}
                        style={{ borderRadius: "5px" }}
                      />
                      <Box
                        sx={{
                          width: "500px",
                          padding: "0px 5px 0px 10px",
                          color: "black",
                        }}
                      >
                        {tour.name}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          color: "#444444",
                          fontSize: "15px",
                          fontWeight: "550",
                          flexDirection: "row",
                        }}
                      >
                        <Box sx={{ marginRight: "2px" }}>
                          {tour.presentPrice}
                        </Box>
                        <Box>vnd</Box>
                      </Box>
                    </a>
                  ))}
                </Box>
              </Box>
            </Box>
          </div>
        )}
      </Box>
    </Box>
  );
}
