import classes from "./styles.module.css";
import "./AnimationTask/Task.css";
import React, { useState, useEffect } from "react";
import { useFetching } from "./CustomHooks/useFetching";
import { useSorting } from "./CustomHooks/useSorting";
import Sorting from "./onPage/Sorting/Sorting";
import Tasks from "./onPage/Tasks/Tasks";
import Input from "./onPage/Input/Input";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { ContentServies } from "./API/ContentServies.js";

import { useSelector, useDispatch } from "react-redux";
import { GetTask } from "./Redux/reducers/GetTask";

import { useCollectionData } from "react-firebase-hooks/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import Form from "./components/Form/Form";

import {setDataTasks} from "./Redux/reducers/TasksReducer.js"

export default function App() {
  //Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyDoPPphgEGAyZRmTEfP25qH-5TxgFOmA24",
    authDomain: "to-do-list-17b94.firebaseapp.com",
    projectId: "to-do-list-17b94",
    storageBucket: "to-do-list-17b94.appspot.com",
    messagingSenderId: "5810038808",
    appId: "1:5810038808:web:577c6843ed358e01a93b6d",
    measurementId: "G-SG29PZFMPB",
  });

  const dispatch = useDispatch();

  const getedTasks = useSelector((state) => state.tasks.dataTasks);

  const error = useSelector((state) => state.tasks.error);

  // хук useState для отслеживания изменений всех задач
  // хук useState для отслеживания того , что написали в инпуте
 
  // хук useState для отслеживания того ,  по какому именно статусу реализуется фильтрация задач
  const [filterSelector, setfilterSelector] = useState("all");
  // хук useState для отслеживания того , нужно или не нужно отобржать предупреждение о том , что поле инпут пустое или нет
  const [visAttention, setvisAttention] = useState(false);

  //здесь будем пробовать взаимодействовать с БД firebase
  const firestore = firebase.firestore();

  // всё для firebase

  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  const SendMessage = async (task) => {
    //firestore.collection('messages').add(task);
  };

  // В самом начале осуществляется запрос для получения всех задач
  // Поскольку в процессе получения данных может возникнуть ошибка ,был создан отдельным кастомный хук
  // для перехвата ошибки useFetching или для получения данных
  //const [fetching, error] = useFetching(async () => {
  //  const res = await ContentServies.GetQuery();

  //console.log(res.docs.map(elem=>{ return {...elem.data(),id:elem.id}}));

  //  setContent(res.docs.map(elem=>{ return {...elem.data(),id:elem.id}}));
  // });


  // фильтрация всего массива по конкретному статусу(выполнен, невыполнен или показать все все задачи)
  // Был создан отдельный кастомный хук,поскольку  может быть придуманот в дальнейшем много условий по которым можно отсортировывать или фильровать задачи
  const tasks = useSorting(getedTasks, filterSelector);

  // хук useEffect использовуется с пустым массивом для того, чтобы один раз отрисовать все задачи
  useEffect(() => {
    dispatch(GetTask());
  }, []);

  // функиця , связанная с добавлением конкретной задачи со своим
  // уникальным id и с невыполненным статусом.
  // В том случаем ,если строка пустая- появляется уведомление
  // const addTask = (task) => {
  //  const taskObj = {
  //    text: task,
  //    active: false,
  //  };

  //  if (taskObj.text.trim()) {
  //   setContent([...contents, taskObj]);
  // //    SendMessage(taskObj)
  //  } else {
  //    setvisAttention(true);
  //    setTimeout(() => {
  //     setvisAttention(false);
  //   }, 3000);
  //  }
  // };

  // функиця , связанная с удалением конкретной задачи по id
  const removeTask = async (id) => {

    await ContentServies.removeTask(id);

    dispatch(setDataTasks(getedTasks.filter(elem=>elem.id!==id)))

  };

  // функиця , связанная с изменением статуса задачи по id
  const changeStatus = async (id) => {

    const cur_status = getedTasks.find(elem=>elem.id===id).active;
    await ContentServies.changeStatus(id,cur_status);
 

    dispatch(setDataTasks(getedTasks.map(elem=>{if(elem.id===id){

      return {...elem, active: !cur_status}

       }else return elem } )))

 
  
 };

 console.log('getedTasks',getedTasks)
  // функиця , связанная с изменением конкретной задачи
    const changeValue = async (id, cur_value) => {

      //  console.log(getedTasks.map(elem=>ifelem.id))

      await ContentServies.changeValue(id,cur_value)
      
        dispatch(setDataTasks(getedTasks.map(elem=>{if(elem.id===id){

       return {...elem, Desctiption:cur_value}

        }else return elem } )))

       



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
          <Form  setvisAttention={setvisAttention}/>
          {/* Кнопка , отвечающая за добавление новой задачи */}

          {/* Sorting - фугкциональный компонент ,отвечающий за сортировку */}
          <Sorting
            filterSelector={filterSelector}
            setfilterSelector={setfilterSelector}
          />

          {/* tasks - результирующий отфильтрованный массив с задачами.
          Tasks- является функциональным компонентом , отвечающим за отображение задачи на странице */}

          {tasks.length !== 0 ? (
            // для анимации списка задач была выбрана библиотека   TransitionGroup
            // Вся логика по работе с анимацей имеет в папке AnimationTask
            <TransitionGroup>
              <ul className={classes.Tasks}>
              {tasks.map((content) => (
                <CSSTransition
                  key={content.id}
                  timeout={500}
                  classNames="Tasks"
                >
                  <Tasks
                    value={content}
                    removeTask={removeTask}
                    changeStatus={changeStatus}
                    changeValue={changeValue}
                  />
                </CSSTransition>
              ))}
           </ul> </TransitionGroup>
          ) : (
            <h1>У Вас нет текущих задач</h1>
          )}
        </div>
      )}
    </div>
  );
}
