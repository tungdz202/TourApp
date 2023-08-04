import { Typography } from "@mui/joy";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getTopProvince } from "../../../Service/province.service";
import { getTourByOrigin } from "../../../Service/tour.service";

export default function SummeryBox() {
  const [data, setData] = useState([{ name: "", sumTour: "" }]);
  const getdata = async () => {
    const ListProvince = await getTopProvince();
    setData(ListProvince);
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <Box>
      <Box>
        <Typography
          sx={{ marginLeft: "130px", color: "#339900", marginBottom: "20px" }}
          fontSize={"20px"}
          fontWeight={550}
        >
          Những địa điểm được yêu thích nhất
        </Typography>
      </Box>
      <Box
        sx={{
          width: "730px",
          height: "300px",
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {data.map((province) => (
          <Box
            sx={{
              width: "280px",
              height: "110px",
              borderRadius: "13px",
              margin: "15px",
              boxShadow: " 0px 7px 29px 0px rgba(100, 100, 111, 0.25)",
              padding: "20px",
            }}
            key={province.name}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
              }}
            >
              <Typography padding={"3px"} fontSize={"17px"} fontWeight={650}>
                {province.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  padding: "5px",
                  position: "absolute",
                  right: 0,
                }}
              >
                <FavoriteBorderIcon
                  sx={{ padding: "2px", color: "#C71585", fontWeight: "650" }}
                />
                <Typography fontSize={"15px"} sx={{ color: "#C71585" }}>
                  {province.sumTour}
                </Typography>
              </Box>
            </Box>
            <Typography
              padding={"3px"}
              fontSize={"15px"}
              fontWeight={550}
              sx={{ color: "#696969", marginTop: "8px" }}
            >
              Tổng số tour:{" "}
              <span
                style={{
                  fontWeight: "550",
                  fontSize: "17px",
                  marginLeft: "5px",
                }}
              >
                {province.sumTour}
              </span>
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
