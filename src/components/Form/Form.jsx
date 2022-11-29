import React, { useState } from "react";
import * as InputJson from "../../JSON/InputJson.json";
import { useDispatch } from "react-redux";
import { ContentServies } from "../../API/ContentServies.js";
import classes from "./Form.module.css";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
import { useForm } from "react-hook-form";

import { GetTask } from "../../Redux/reducers/GetTask";

const Form = () => {

  const [TaskInfo, setTaskInfo] = useState({
    date: "",
    task: "",
    description: "",
  });

  const dispatch = useDispatch();
   //TaskInfo.date.split('').some(elem=>elem==='_')&&

  console.log(TaskInfo.date.split('').some(elem=>elem==='_')||!TaskInfo.task.trim())

  // добавление новой задачи

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const taskObj = {
      Date: data.date.replace(/[^0-9,".",":"," "]/g, ""),
      Desctiption: data.description,
      Title: data.task,
      active: "Невыполненна",
      id_file: Date.now(),
    };

    await ContentServies.addTask(taskObj);

    dispatch(GetTask());

    setTaskInfo({
      date: "",
      task: "",
      description: "",
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <span className={classes.form__title}>Добавить новую задачу</span>
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

      <button className={classes.form__btn}>Добавить задачу</button>
    </form>
  );
};

export default Form;
