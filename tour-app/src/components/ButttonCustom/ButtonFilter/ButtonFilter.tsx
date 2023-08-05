import React from "react";
import style from "./style.module.css";

export default function ButtonFilter(props: { text: String }) {
  return (
    <button className={style.button} role="button">
      {props.text}
    </button>
  );
}
