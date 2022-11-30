import React from "react";
import "../../style/AnimationTask/Task.css";
import classes from "./Tasks.module.css";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";

// utils
import { CompareDate } from "../../utils/CompareDate";

// customHooks
import { useSorting } from "../../CustomHooks/useSorting";

import { ContentServies } from "../../API/ContentServies.js";
import { setDataTasks } from "../../Redux/reducers/TasksReducer";

// UI-компоненнты
import Task from "../../components/UI/Task/Task";
import Loader from "../../components/UI/Loader/Loader";

/**
 *Функциональный компонент , который предназначен для отображения всех тасок
 */
const Tasks = ({ filterSelector }) => {
  const loading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);
  const dataTasks = useSelector((state) => state.tasks.dataTasks);

  const dispatch = useDispatch();

  /**
   *@param {Array} tasks уже осортированный массив тасок
   */
  const tasks = useSorting(
    dataTasks.map((elem) => {
      return { ...elem, overdue: CompareDate(elem.Date) };
    }),
    filterSelector
  );

  // ВСЯ ЛОГИКА СВЯЗАННАЯ С ЗАДАЧАМИ

  /**
   * Функция , которая удаляет конкретную таску и на фронте и на бэке
   * @param {string} id уникальный id таски
   */
  const removeTask = async (id) => {
    try {
      await ContentServies.removeTask(id);
      dispatch(setDataTasks(dataTasks.filter((elem) => elem.id !== id)));
      alert("Задача была удалена");
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * функиця , связанная с изменением статуса задачи по id и на фронте , и на бэке
   * @param {string} id уникальный id таски
   */
  const changeStatus = async (id) => {
    let cur_status = dataTasks.find((elem) => elem.id === id).active;

    if (cur_status == "Выполненна") {
      cur_status = "Невыполненна";
    } else {
      cur_status = "Выполненна";
    }

    try {
      await ContentServies.changeStatus(id, cur_status);
      dispatch(
        setDataTasks(
          dataTasks.map((elem) => {
            if (elem.id === id) {
              return { ...elem, active: cur_status };
            } else return elem;
          })
        )
      );
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   *  функиця , связанная с изменением описания конкретной задачи по id и на фронте , и на бэке
   * @param {string} id уникальный id таски
   *  @param {string} cur_value значение , на которое нужно поменять описание
   */
  const changeValue = async (id, cur_value) => {
    try {
      await ContentServies.changeValue(id, cur_value);
      dispatch(
        setDataTasks(
          dataTasks.map((elem) => {
            if (elem.id === id) {
              return { ...elem, Desctiption: cur_value };
            } else return elem;
          })
        )
      );
      alert("Описание задачи было изменено");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <ul className={classes.Tasks}>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1 className={classes.Error}>{error}</h1>
      ) : tasks.length !== 0 ? (
        <TransitionGroup>
          {tasks.map((task) => (
            <CSSTransition key={task.id} timeout={500} classNames="Tasks">
              <Task
                removeTask={removeTask}
                changeValue={changeValue}
                changeStatus={changeStatus}
                value={task}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <h1>У Вас нет таких задач</h1>
      )}
    </ul>
  );
};

export default Tasks;
