import React from "react";
import style from "./style.module.css";

export default function ButtonSubmit(props: { text: String }) {
  return (
    <div>
      <button className={style.button_82_pushable} role="button">
        <span className={style.button_82_shadow}></span>
        <span className={style.button_82_edge}></span>
        <span className={style.button_82_front}>{props.text}</span>
      </button>
    </div>
  );
}
