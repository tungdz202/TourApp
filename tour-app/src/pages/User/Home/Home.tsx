import React, { useEffect } from "react";
import Header from "../../../components/Header/Header";
import Slide from "../../../components/Slide/Slide";
import style from "./Style.module.css";
import PopularPrinces from "../../../components/PopularPrinces/PopularPrinces";
import HotTours from "../../../components/HotTours/HotTours";
import Provinces from "../../../components/Provinces/Provinces";
import Blogs from "../../../components/Blogs/Blogs";
import { Box } from "@mui/material";
import TopHead from "../../../components/TopHead/TopHead";
import { AccountDetail } from "../../../types/Account";
import { useAppSelector } from "../../../Redux/store";
import Cookies from "js-cookie";

export default function Home() {
  return (
    <div className={style.container}>
      <TopHead />
      <Header />
      <Slide />
      <PopularPrinces />
      <HotTours />
      <Provinces />
      <Blogs />
    </div>
  );
}
