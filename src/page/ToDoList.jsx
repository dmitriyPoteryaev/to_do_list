import React, { useEffect, useState } from "react";
import classes from "./ToDoList.module.css";

// все составляющие Content
import Form from "../components/Form/Form";
import Sorting from "../components/UI/Sorting/Sorting";
import Tasks from "../components/Tasks/Tasks";

import { GetTaskStorage } from "../Redux/reducers/GetTaskStorage";
import { useDispatch } from "react-redux";
/**
 * Функциональный компонент , в котором присутствует все основнеы компоненты
 * Form,Sorting,Tasks
 */
const ToDoList = () => {
  /**
   * Данный хук нужен , чтобы изменить state , который отвечает за фильтрацию параметров
   * Все таски можно отфильтровать по значениям - Просрочено,Выполненна,Невыполненна,Все
   * @param {string} filterSelector
   */
  const [filterSelector, setfilterSelector] = useState("all");
  /**
   *Функция из бибилотеки react-redux, которая предназначена для изменения глобального состояния
   */
  const dispatch = useDispatch();

  /**
   *хук useEffet- вызывается один раз , чтобы получить все такси из БД firebase
   */
  useEffect(() => {
    dispatch(GetTaskStorage());
  }, []);

  return (
    <section className={classes.ToDoList}>
      <Form />
      <Sorting
        filterSelector={filterSelector}
        setfilterSelector={setfilterSelector}
      />
      <Tasks filterSelector={filterSelector} />
    </section>
  );
};

export default ToDoList;
