import React from "react";
import classes from "./Tasks.module.css";
import {getDate} from "../../CustomHooks/getDate.js"

const BlockOfTask = ({ value, removeBlock, changeStatus, changeValue }) => {
  return (
    <div className={classes.Task}>
      <label id="status">
        <input
          type="checkbox"
          id="status"
          checked={value.active}
          onChange={() => changeStatus(value)}
        />
      </label>

      <label id="value" className={classes.Taskinput}>
        <input
          value={value.text}
          id="value"
          className={classes.Taskinput}
          onChange={(event) => changeValue(value, event.target.value)}
        />
      </label>
      <p>{getDate()}</p>

      <button className={classes.remBut} onClick={() => removeBlock(value)}>
        Удалить задачу
      </button>
    </div>
  );
};

export default BlockOfTask;
