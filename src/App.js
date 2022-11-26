import classes from "./styles.module.css";
import "./AnimationTask/Task.css";
import React, { useState, useEffect } from "react";
import { useFetching } from "./CustomHooks/useFetching";
import { useSorting } from "./CustomHooks/useSorting";
import { ContentServies } from "./API/ContentServies";
import Sorting from "./onPage/Sorting/Sorting";
import Tasks from "./onPage/Tasks/Tasks";
import Input from "./onPage/Input/Input";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function App() {
  // хук useState для отслеживания изменений всех задач
  const [contents, setContent] = useState([]);
  // хук useState для отслеживания того , что написали в инпуте
  const [newTask, setNewTasks] = useState("");
  // хук useState для отслеживания того ,  по какому именно статусу реализуется фильтрация задач
  const [filterSelector, setfilterSelector] = useState("all");
  // хук useState для отслеживания того , нужно или не нужно отобржать предупреждение о том , что поле инпут пустое или нет
  const [visAttention, setvisAttention] = useState(false);

  // В самом начале осуществляется запрос для получения всех задач
  // Поскольку в процессе получения данных может возникнуть ошибка ,был создан отдельным кастомный хук
  // для перехвата ошибки useFetching или для получения данных
  const [fetching, error] = useFetching(async () => {
    const res = await ContentServies.GetQuery();

    setContent(res.data);
  });

  // фильтрация всего массива по конкретному статусу(выполнен, невыполнен или показать все все задачи)
  // Был создан отдельный кастомный хук,поскольку  может быть придуманот в дальнейшем много условий по которым можно отсортировывать или фильровать задачи
  const tasks = useSorting(contents, filterSelector);

  // хук useEffect использовуется с пустым массивом для того, чтобы один раз отрисовать все задачи
  useEffect(() => {
    fetching();
  }, []);

  // функиця , связанная с добавлением конкретной задачи со своим
  // уникальным id и с невыполненным статусом.
  // В том случаем ,если строка пустая- появляется уведомление
  const addTask = (task) => {
    const taskObj = {
      id: Date.now(),
      text: task,
      active: false
    };

    taskObj.text.trim()
      ? setContent([...contents, taskObj])
      : (setvisAttention(true),
        setTimeout(() => {
          setvisAttention(false);
        }, 3000));
  };

  // функиця , связанная с удалением конкретной задачи по id
  const removeTask = (taskId) => {
    setContent(contents.filter((position) => position.id !== taskId.id));
  };

  // функиця , связанная с изменением статуса задачи по id
  const changeStatus = (number) => {
    setContent(
      contents.map((el) => {
        if (el.id === number.id) {
          el.active = !el.active;
          return el;
        } else return el;
      })
    );
  };

  // функиця , связанная с изменением конкретной задачи
  const changeValue = (Arr_value, cur_value) => {
    setContent(
      contents.map((el) => {
        if (el.id === Arr_value.id) {
          el.text = cur_value;
          return el;
        } else return el;
      })
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
        <div>
          {/* функциональный компонент ,отвечающий за инпут на странице */}
          <Input setNewTasks={setNewTasks} visAttention={visAttention} />
          <h1>Поставь себе на сегодня задачи!</h1>
          {/* Кнопка , отвечающая за добавление новой задачи */}
          <div className={classes.AddPlusSort}>
            <button className={classes.AddBut} onClick={() => addTask(newTask)}>
              Добавить задачу
            </button>
            {/* Sorting - фугкциональный компонент ,отвечающий за сортировку */}
            <Sorting
              filterSelector={filterSelector}
              setfilterSelector={setfilterSelector}
            />
          </div>

          {/* tasks - результирующий отфильтрованный массив с задачами.
          Tasks- является функциональным компонентом , отвечающим за отображение задачи на странице */}

          {tasks.length !== 0 ? (
            // для анимации списка задач была выбрана библиотека   TransitionGroup
            // Вся логика по работе с анимацей имеет в папке AnimationTask
            <TransitionGroup>
              {tasks.map((content) => (
                <CSSTransition
                  key={content.id}
                  timeout={500}
                  classNames="Tasks"
                >
                  <Tasks
                    value={content}
                    removeBlock={removeTask}
                    changeStatus={changeStatus}
                    changeValue={changeValue}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          ) : (
            <h1>У Вас нет текущих задач</h1>
          )}
        </div>
      )}
    </div>
  );
}
