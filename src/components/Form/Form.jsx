import React, { useState }  from "react";
import * as InputJson from "../../JSON/InputJson.json";
import { useSelector, useDispatch } from "react-redux";
import "firebase/compat/firestore";
import { ContentServies } from "../../API/ContentServies.js";
import classes from "./Form.module.css";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
import {useForm} from "react-hook-form";

import {setNewTask} from "../../Redux/reducers/TasksReducer"

import { GetTask } from "../../Redux/reducers/GetTask";

const Form = ({setvisAttention}) => {
  // ВСЯ ЛОГИКА ПО УДАЛЕНИЮ ИЛИ ДОБАВЛЕНИЮ И Т.Д НОВОЙ ЗАДАЧИ
  const [newTask, setNewTasks] = useState("");

  const [TaskInfo, setTaskInfo] = useState({
    date: "",
    task: "",
    description: "",
  });


  const dispatch= useDispatch();


   // добавление новой задачи

 // const AddTask = async (task) => {
  // const taskObj = {
  //   Date: TaskInfo.Date,
  //   Desctiption: TaskInfo.Desctiption,
  //   Title: TaskInfo.Title,
  //   active: false,
  // };


 //};

const {register, handleSubmit} = useForm();

const onSubmit = async (data)=>{

 //const storageRef = await  ContentServies.addTask();
 const taskObj = {
    Date: data.date,
     Desctiption: data.description,
     Title: data.task,
     active: false,
  };
  //const fileRef = storageRef.child(data.file[0].name);
  //fileRef.put(data.file[0]);
  console.log(taskObj)

 await ContentServies.addTask(taskObj);

 dispatch(GetTask())

 setTaskInfo({

  date: "",
  task: "",
  description: "",

 })


}


  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <span className={classes.DataEntry}>Добавить новую задачу</span>
      {InputJson.default.map((value) => (
        <ModalInput
          value={value}
          key={value.name}
          register={register}
          inputValue={TaskInfo[value.name]}
          onchange={(event) => {
            setTaskInfo((prevState) => ({
              ...prevState,
              [value.name]: event,
            }));
          }}
        ></ModalInput>
      ))}

      <button className={classes.AddBut} >
        Добавить задачу
      </button>
    </form>
  );
};

export default Form;
