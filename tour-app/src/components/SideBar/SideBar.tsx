import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import style from "./style.module.css";
import React from "react";
import { logo, avatar } from "../../public/img/index";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import ForumIcon from "@mui/icons-material/Forum";
import FeedIcon from "@mui/icons-material/Feed";
import { useNavigate } from "react-router-dom";
import { AccountDetail } from "../../types/Account";
import { useAppSelector } from "../../Redux/store";

export default function SideBar(prop: any) {
  const [view, setView] = React.useState(prop.param);
  let Account: AccountDetail = useAppSelector(
    (state) => state.account.account.account
  );
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string | null
  ) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <a
          href="/admin/dashboard"
          style={{
            marginLeft: "70px",
          }}
        >
          <img src={logo} alt="logo" height={"100px"} width={"100px"} />
        </a>
      </Box>
      <Box
        sx={{
          margin: "0 20px 20px 20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#EDEFF2",
          padding: "15px",
          borderRadius: "10px",
          width: "250px",
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "60px",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          <img src={avatar} alt="ava" width={"60px"} height={"60px"} />
        </Box>
        <Box sx={{ width: "auto" }}>
          <Typography
            fontSize={"20px"}
            fontFamily={"inherit"}
            fontWeight={500}
            sx={{ paddingLeft: "20px" }}
          >
            {Account.username}
          </Typography>
        </Box>
      </Box>
      {/* <Box sx={{ padding: "20px 0 0 10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "13px",
            backgroundColor: "#EDEFF2",
            borderRadius: "6px",
            width: "277px",
          }}
        >
          <a>
            <EqualizerIcon sx={{ color: "#BDC4CA" }} />
          </a>
          <Typography
            fontSize={"14px"}
            fontWeight={550}
            sx={{ paddingLeft: "10px" }}
          >
            Dashboard
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "13px",
            borderRadius: "6px",
            width: "277px",
          }}
        >
          <a>
            <PersonOutlineIcon sx={{ color: "#BDC4CA" }} />
          </a>
          <Typography
            fontSize={"14px"}
            fontWeight={550}
            sx={{ paddingLeft: "10px" }}
          >
            User
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "13px",
            borderRadius: "6px",
            width: "277px",
          }}
        >
          <a>
            <AirplaneTicketIcon sx={{ color: "#BDC4CA" }} />
          </a>
          <Typography
            fontSize={"14px"}
            fontWeight={550}
            sx={{ paddingLeft: "10px" }}
          >
            Tour
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "13px",
            borderRadius: "6px",
            width: "277px",
          }}
        >
          <a>
            <FeedIcon sx={{ color: "#BDC4CA" }} />
          </a>
          <Typography
            fontSize={"14px"}
            fontWeight={550}
            sx={{ paddingLeft: "10px" }}
          >
            Blog
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "13px",
            borderRadius: "6px",
            width: "277px",
          }}
        >
          <a>
            <ForumIcon sx={{ color: "#BDC4CA" }} />
          </a>
          <Typography
            fontSize={"14px"}
            fontWeight={550}
            sx={{ paddingLeft: "10px" }}
          >
            Comment
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "13px",
            borderRadius: "6px",
            width: "277px",
          }}
        >
          <a>
            <EqualizerIcon sx={{ color: "#BDC4CA" }} />
          </a>
          <Typography
            fontSize={"14px"}
            fontWeight={550}
            sx={{ paddingLeft: "10px" }}
          >
            Provinces
          </Typography>
        </Box>
      </Box> */}
      <ToggleButtonGroup
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
        sx={{ marginTop: "20px" }}
      >
        {listAmin.map((l) => (
          <ToggleButton
            onClick={() => navigate(`/admin/${l.name}`)}
            value={l.value}
            key={l.name}
            sx={{
              border: "none",
              height: "60px",
              borderRadius: "5px",
              marginBottom: "10px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "13px",
                borderRadius: "6px",
                width: "277px",
              }}
            >
              <a style={{ color: "#BDC4CA" }}>{l.icon}</a>
              <Typography
                paddingTop={"2px"}
                fontSize={"14px"}
                fontWeight={550}
                color={"#888888	"}
                sx={{ paddingLeft: "10px" }}
              >
                {l.name}
              </Typography>
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

const listAmin = [
  {
    name: "dashboard",
    icon: <EqualizerIcon />,
    value: "dashboard",
  },
  { name: "user", icon: <PersonOutlineIcon />, value: "user" },
  { name: "tour", icon: <AirplaneTicketIcon />, value: "tour" },
  { name: "collection", icon: <ForumIcon />, value: "collection" },
  { name: "blog", icon: <FeedIcon />, value: "blog" },
  { name: "province", icon: <PersonOutlineIcon />, value: "province" },
];
