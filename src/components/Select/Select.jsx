import React from "react";
import classes from "./Select.module.css";

/**
 *Функциональный компонент , который предназначен для отображения всех options , по которым можно оссортировать таски
 */
const Select = ({
  defaultName,
  options,
  filterSelector,
  setfilterSelector,
}) => {
  return (
    <select
      className={classes.select}
      value={filterSelector}
      onChange={(event) => setfilterSelector(event.target.value)}
    >
      <option className={classes.option} disabled value="all">
        {defaultName}
      </option>
      {options.map((option) => (
        <option
          className={classes.option}
          key={option.value}
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
