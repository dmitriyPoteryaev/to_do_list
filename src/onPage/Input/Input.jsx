import React from "react";
import Attention from "../Attention/Attention";
import classes from "./Input.module.css";

const Input = ({ setNewTasks,newTask, visAttention }) => {
  return (
    <label id='newTask'  className={[classes.input].join("")}>
      
      <input
      id='newTask'
        className={
          visAttention
            ? [classes.Active_red_input].join("")
            : [classes.Usual_input].join("")
        }
        type="text"
        value={newTask}
        placeholder="Введите задачу.."
        onChange={(event) => setNewTasks(event.target.value)}
      /> 
      {/* функциональный компонент Attention? отвечающий за предупреждение о пустой строке в инпуте  */}
      <Attention visAttention={visAttention} />
      </label>

      
  );
};

export default Input;
