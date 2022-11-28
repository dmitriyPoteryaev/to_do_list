import React from "react";
import classes from "./Tasks.module.css";

const BlockOfTask = ({ value, removeTask, changeStatus, changeValue }) => {
  return (
    <li className={value.overdue?classes.Task:classes.TaskOverdue}>
      <div className={classes.Task__Title}>
        {/* 1 строка */}
        <span className={classes.Task__title}>{value.Title}</span>
        <p className={classes.Task__date}>Дата завершения - {value.Date}</p>
        <p className={classes.Task__overdue}>
          {value.overdue ? "" : "Просрочено"}
        </p>
      </div>
      {/* 2 строка */}
      <div className={classes.Task__info}>
        <label id="status" className={classes.Task__checkbox}>
          {value.active}
          <input
            type="checkbox"
            id="status"
            checked={value.active === "Невыполненна" ? false : true}
            onChange={() => changeStatus(value.id)}
          />
        </label>

        <label id="value" className={classes.Task__label} >
          <input
            value={value.Desctiption}
            id="value"
            className={classes.Task__files}
            onChange={(event) => changeValue(value.id, event.target.value)}
          />
        </label>
        <button className={classes.remBut} onClick={() => removeTask(value.id)}>
          remove
        </button>
      </div>
      {/* 3 строка */}
      <label id="file" className={classes.Task__label}>
        <input type="file" id="value" className={classes.Task__files} />
      </label>
    </li>
  );
};

export default BlockOfTask;
