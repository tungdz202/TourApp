import { Box } from "@mui/material";
import React, { Children } from "react";
import Header from "../Header/Header";

export default function PageContainer({ children }: any) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
