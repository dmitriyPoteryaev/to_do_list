import classes from "./styles.module.css";
import "./AnimationTask/Task.css";
import React, { useState, useEffect } from "react";
import { useSorting } from "./CustomHooks/useSorting";
import Sorting from "./onPage/Sorting/Sorting";
import Tasks from "./onPage/Tasks/Tasks";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CompareDate } from "./CustomHooks/CompareDate.js";
import { ContentServies } from "./API/ContentServies.js";
import { useSelector, useDispatch } from "react-redux";
import { GetTask } from "./Redux/reducers/GetTask";
import Form from "./components/Form/Form";
import { setDataTasks } from "./Redux/reducers/TasksReducer.js";
import  Loader  from "./components/UI/Loader/Loader";

export default function App() {
  const dispatch = useDispatch();

  const dataTasks  = useSelector((state) => state.tasks.dataTasks);
  const error = useSelector((state) => state.tasks.error);
  const loading = useSelector((state) => state.tasks.isLoading);

  // хук useState для отслеживания изменений всех задач
  // хук useState для отслеживания того , что написали в инпуте

  // хук useState для отслеживания того ,  по какому именно статусу реализуется фильтрация задач
  const [filterSelector, setfilterSelector] = useState("all");
  // хук useState для отслеживания того , нужно или не нужно отобржать предупреждение о том , что поле инпут пустое или нет

  // В самом начале осуществляется запрос для получения всех задач

  // фильтрация всего массива по конкретному статусу(выполнен, невыполнен или показать все все задачи)
  // Был создан отдельный кастомный хук,поскольку  может быть придуманот в дальнейшем много условий по которым можно отсортировывать или фильровать задачи
  const tasks = useSorting(
    dataTasks.map((elem) => {
      return { ...elem, overdue: CompareDate(elem.Date) };
    }),
    filterSelector
  );

  // хук useEffect использовуется с пустым массивом для того, чтобы один раз отрисовать все задачи
  useEffect(() => {
    dispatch(GetTask());
  }, []);

  // функиця , связанная с удалением конкретной задачи по id
  const removeTask = async (id) => {
    await ContentServies.removeTask(id);

    dispatch(setDataTasks(dataTasks.filter((elem) => elem.id !== id)));
  };

  // функиця , связанная с изменением статуса задачи по id
  const changeStatus = async (id) => {
    let cur_status = dataTasks.find((elem) => elem.id === id).active;

    if (cur_status == "Выполненна") {
      cur_status = "Невыполненна";
    } else {
      cur_status = "Выполненна";
    }

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
  };

  // функиця , связанная с изменением конкретной задачи
  const changeValue = async (id, cur_value) => {
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
  };

  // для лучшей читаемости кода были созданы отдельно функциональные компоненты в папке OnPage
  // которые описывают каждый эдемент на странице
  return (
    <div className={classes.App}>
      {/* error-переменная , которая ретёрниться в результате вызова useFetching
      .Если ошибки нет, то на странице будут отображаться текущие задачи.
      Если ошибка есть, то показываться ошибка */}
      {error ? (
        <h1 className={classes.Error}>Произошла ошибка ${error}`</h1>
      ) : (
        <div className={classes.Content}>
          {/* функциональный компонент ,отвечающий за инпут на странице */}
          <Form  />
          {/* Кнопка , отвечающая за добавление новой задачи */}

          {/* Sorting - фугкциональный компонент ,отвечающий за сортировку */}
          <Sorting
            filterSelector={filterSelector}
            setfilterSelector={setfilterSelector}
          />

          {/* tasks - результирующий отфильтрованный массив с задачами.
          Tasks- является функциональным компонентом , отвечающим за отображение задачи на странице */}

          {loading
          ?
          <Loader/>
          :
          tasks.length !== 0 ? (
            // для анимации списка задач была выбрана библиотека   TransitionGroup
            // Вся логика по работе с анимацей имеет в папке AnimationTask
            <TransitionGroup>
              
                {tasks.map((task) => (
                  <CSSTransition
                    key={task.id}
                    timeout={500}
                    classNames="Tasks"
                  >
                    <Tasks
                      value={task}
                      removeTask={removeTask}
                      changeStatus={changeStatus}
                      changeValue={changeValue}
                    />
                  </CSSTransition>
                ))}
            
            </TransitionGroup>
          ) : (
            <h1>У Вас нет таких задач</h1>
          )}
        </div>
      )}
    </div>
  );
}
