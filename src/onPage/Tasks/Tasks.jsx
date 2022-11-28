import React from "react";
import classes from "./Tasks.module.css";
import { useSelector, useDispatch } from "react-redux";
import { GetTask } from "../../Redux/reducers/GetTask";



const BlockOfTask = ({ value, removeTask, changeStatus, changeValue }) => {

  const dispatch = useDispatch();
  return (
    <li className={classes.Task}>
      <div>
        {/* 1 строка */}
      <span className={classes.Task__title}>{value.Title}</span>
      <p className={classes.Task__date}>Дата завершения - {value.Date}</p>
      </div>
       {/* 2 строка */}
      <div className={classes.Task__info}>
        <label id="status">
          <input
            type="checkbox"
            id="status"
            checked={value.active}
            onChange={() => changeStatus(value.id)}
          />
        </label>

        <label id="value" className={classes.Task__files}>
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
      <label id="file" >
        <input type="file" id="value" className={classes.Task__files} />
      </label>
    </li>
  );
};

export default BlockOfTask;
