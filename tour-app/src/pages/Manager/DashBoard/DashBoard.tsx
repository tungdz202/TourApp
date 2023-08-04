import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import QuantityByMonth from "../../../components/AdminComponents/QuantityByMonth/QuantityByMonth";
import SummeryBox from "../../../components/AdminComponents/SummeryBox/SummeryBox";
import OverAll from "../../../components/AdminComponents/OverAll/OverAll";
import { Box } from "@mui/material";
import { getOverAll } from "../../../Service/dashboard.service";

export default function DashBoard() {
  const param = "dashboard";

  return (
    <Box>
      <HeaderAdmin />
      <SideBar param={param} />
      <Box
        sx={{
          height: "auto",
          width: "1150px",
          margin: "140px 0px 0px 400px",
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          zIndex: 1,
        }}
      >
        {/* <Bar data={{labels:['red,blue']}} /> */}
        <Box>
          <SummeryBox />
          <QuantityByMonth />
        </Box>
        <OverAll />
      </Box>
    </Box>
  );
}
