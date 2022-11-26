import React from "react";
import classes from "./Attention.module.css";

const Attention = ({ visAttention }) => {
  return (
    <div
      className={
        visAttention
          ? [classes.Attention_vis].join("")
          : [classes.Attention_hide].join("")
      }
    >
      <small>Поле с заданием не заполнено!</small>
    </div>
  );
};

export default Attention;
