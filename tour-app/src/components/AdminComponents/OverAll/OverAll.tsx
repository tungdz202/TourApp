import { Typography } from "@mui/joy";
import { Box } from "@mui/material";
import React from "react";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { getOverAll } from "../../../Service/dashboard.service";

interface OverAllData {
  blog: number;
  collection: number;
  province: number;
  tour: number;
  user: number;
}
export default function OverAll() {
  const [data, setData] = React.useState<OverAllData>();
  const getData = async () => {
    const res: OverAllData = await getOverAll();
    setData(res);
  };
  console.log(data);
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <Box
      sx={{
        width: "350px",
        height: "500px",
        borderRadius: "15px",
        boxShadow: " 0px 7px 29px 0px rgba(100, 100, 111, 0.25)",
        marginTop: "55px",
        padding: "30px",
      }}
    >
      <Typography
        sx={{
          margin: "10px 0px 30px 20px",
          fontSize: "20px",
          fontWeight: "550",
          color: "#666666",
        }}
      >
        Overall
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#EEEEEE",
            padding: "13px",
            margin: "0px 40px 0px 10px",
          }}
        >
          <TourOutlinedIcon fontSize={"medium"} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "550", color: "#777777" }}
            >
              {data?.tour}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "450", color: "#777777" }}
            >
              Tours
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", marginBottom: "20px " }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#EEEEEE",
            padding: "13px",
            margin: "0px 40px 0px 10px",
          }}
        >
          <LibraryBooksIcon fontSize={"medium"} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "550", color: "#777777" }}
            >
              {data?.collection}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "450", color: "#777777" }}
            >
              Collections
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", marginBottom: "20px " }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#EEEEEE",
            padding: "13px",
            margin: "0px 40px 0px 10px",
          }}
        >
          <PersonOutlineOutlinedIcon fontSize={"medium"} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "550", color: "#777777" }}
            >
              {data?.user}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "450", color: "#777777" }}
            >
              Users
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", marginBottom: "20px " }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#EEEEEE",
            padding: "13px",
            margin: "0px 40px 0px 10px",
          }}
        >
          <FeedOutlinedIcon fontSize={"medium"} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "550", color: "#777777" }}
            >
              {data?.blog}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "450", color: "#777777" }}
            >
              Blogs
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", marginBottom: "20px " }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#EEEEEE",
            padding: "13px",
            margin: "0px 40px 0px 10px",
          }}
        >
          <MapOutlinedIcon fontSize={"medium"} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "550", color: "#777777" }}
            >
              {data?.province}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "450", color: "#777777" }}
            >
              Provinces
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
