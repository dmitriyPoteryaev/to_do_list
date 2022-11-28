import React from "react";
import classes from "./ModalInput.module.css";
import InputMask from "react-input-mask";

function ModalInput({ value, onchange, inputValue,register }) {
  return (
    <div className={classes.commonInp}>
      {value.name !== "date" ? (
        <label className={classes.commonInp__label}>
          <span className={classes.commonInp__nameInput}>
            {value.nameInput}
          </span>
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
      ) : (
        <label className={classes.commonInp__label}>
          <span className={classes.commonInp__nameInput}>
          {value.nameInput}
          </span>
          <InputMask mask="Год-9999.Месяц-99.День-99 Время - 99:99" value={inputValue}  {...register(value.name, { required: true })}  onChange={(event) => onchange(event.target.value)}>
            {() => <input placeholder={value.placeholder}  name={value.name}   className={classes.commonInp__input} type={value.type}/>}
          </InputMask>
        </label>
      )}
    </div>
  );
}

export default ModalInput;
