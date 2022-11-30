import React from "react";
import classes from "./ModalInput.module.css";
import InputMask from "react-input-mask";

function ModalInput({ value, onchange, inputValue, register }) {
  return (
    <div className={classes.commonInp}>
      <label className={classes.commonInp__label}>
        <span className={classes.commonInp__nameInput}>{value.nameInput}</span>
        <input
          className={classes.commonInp__input}
          {...register(value.name, { required: true })}
          type={value.type}
          value={inputValue}
          placeholder={value.placeholder}
          name={value.name}
          onChange={(event) => onchange(event.target.value)}
        />
      </label>
    </div>
  );
}

export default ModalInput;
