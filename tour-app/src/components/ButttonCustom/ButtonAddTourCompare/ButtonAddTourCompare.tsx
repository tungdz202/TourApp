import React from "react";
import style from "./style.module.css";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";

export default function ButtonAddTourCompare() {
  return (
    <div>
      <button className={style.button} role="button">
        <PlaylistAddRoundedIcon sx={{ marginRight: "5px" }} />
        Thêm vào bảng so sánh
      </button>
    </div>
  );
}
