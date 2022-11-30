import React from "react";
import classes from "./ModalInput.module.css";

  /**
 *Переиспользуемый функциональный компонент, который можно использовать для отображеня всех инпутов в форме
  .Все атрибуты для отображения инпутов имеются в папке JSON в json-файле InputJson
 */
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
