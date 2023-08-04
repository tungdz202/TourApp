import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AdbIcon from "@mui/icons-material/Adb";
import { avatar } from "../../public/img";
import { AccountDetail } from "../../types/Account";
import { useAppSelector } from "../../Redux/store";
import Cookies from "js-cookie";
import { getAccessToken, getUserDetail } from "../../Service/auth.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const settings = ["Logout"];
export default function HeaderAdmin() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let Account: AccountDetail = useAppSelector(
    (state) => state.account.account.account
  );

  console.log(Account.role);
  const getAccesstokenFromCookie = () => {
    const userCookie = Cookies.get("accesstoken");
    return userCookie ? userCookie : null;
  };

  const getRefreshTokenFromCookie = () => {
    const token = Cookies.get("refreshtoken");
    if (!token) navigate("/");
    return token ? token : null;
  };

  if (Account.role == 1) {
    navigate("/");
  }

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

  // let user = getUserFromCookie();
  React.useEffect(() => {
    checkUser();
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        position: "fixed",
        zIndex: "2",
        backgroundColor: "#F9FAFB",
        boxShadow: "none",
        height: "100px",
        opacity: 0.9,
      }}
    >
      <Container
        sx={{
          width: "1400px",
          position: "absoluted",
          marginRight: "20px",
          paddingTop: "15px",
        }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
            }}
          >
            <Typography color={"black"} variant="h6" fontWeight={500}>
              Wellcome to TATravel
            </Typography>
            <Typography color={"#696969"}>
              Hello {Account.username}...
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
