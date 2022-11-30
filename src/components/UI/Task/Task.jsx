import React, { useState, useEffect } from "react";
import classes from "./Task.module.css";
import { ContentServies } from "../../../API/ContentServies.js";
import { ref, uploadBytes } from "firebase/storage";
import { setDataStorage } from "../../../Redux/reducers/TasksReducer";

import { useSelector, useDispatch } from "react-redux";

import { GetTask } from "../../../Redux/reducers/GetTask";

const Task = ({ value, removeTask, changeStatus, changeValue }) => {
  const [fileUpload, setImageFile] = useState(null);

  const [Value, setValue] = useState({
    curValue: "",
    id: "",
  });

  const storage = useSelector((state) => state.tasks.storage);

  const dispatch = useDispatch();

  // загрузить файл
  async function Unloadfile(id) {
    if (fileUpload === null) {
      return;
    } else {
      const fileRef = ref(ContentServies.getApp(), `${id}`);
      try {
        await uploadBytes(fileRef, fileUpload);
        alert("Файл был добавлен");
      } catch (e) {
        alert(e.message);
      }
    }
  }

  // удалить задачу

  async function DeleteFile(id) {
    if (storage.some((elem) => elem.name == id)) {
      const fileRef = ref(ContentServies.getApp(), `${id}`);
      try {
        await ContentServies.DeleteFile(fileRef);
        dispatch(setDataStorage(storage.filter((elem) => elem.name != id)));
        alert("Файл был удалён");
      } catch (e) {
        alert(e.message);
      }
    } else {
      return;
    }
  }

  return (
    <li className={value.overdue ? classes.Task : classes.TaskOverdue}>
      <div className={classes.Task__Title}>
        {/* 1 строка */}
        <span className={classes.Task__title}>{value.Title}</span>
        <p className={classes.Task__date}>Дата завершения - {value.Date}</p>
        <p className={classes.Task__overdue}>
          {value.overdue ? "" : "Просрочено"}
        </p>
      </div>
      {/* 2 строка */}
      <div className={classes.Task__info}>
        <label id="status" className={classes.Task__checkbox}>
          {value.active}
          <input
            type="checkbox"
            id="status"
            checked={value.active === "Невыполненна" ? false : true}
            onChange={() => changeStatus(value.id)}
          />
        </label>

        <label id="value" className={classes.Task__label}>
          <input
            value={Value.curValue.trim() ? Value.curValue : value.Desctiption}
            id="value"
            className={classes.Task__files}
            onChange={(event) =>
              setValue({ curValue: event.target.value, id: value.id })
            }
          />
        </label>
        <button
          className={[classes.btn, classes.rem].join(" ")}
          onClick={() => {
            removeTask(value.id);
            DeleteFile(value.id_file);
          }}
        >
          remove
        </button>
        <button
          disabled={!Value.curValue.trim()}
          className={[classes.btn, classes.change].join(" ")}
          onClick={() => {
            changeValue(value.id, Value.curValue);
            setValue({
              curValue: "",
              id: "",
            });
          }}
        >
          chahnge
        </button>
      </div>
      {/* 3 строка */}
      {storage
        .map((elem) => elem.name)
        .some((elem) => elem == value.id_file) ? (
        <div>
          <a href={storage.find((elem) => elem.name == value.id_file).url}>
            Посмотреть файл
          </a>
          <button
            className={[classes.btn, classes.rem].join(" ")}
            onClick={() => DeleteFile(value.id_file)}
          >
            remove file
          </button>
        </div>
      ) : (
        <label id="file" className={classes.Task__label}>
          <input
            type="file"
            id="value"
            name="value"
            className={classes.Task__files}
            onChange={(event) => {
              setImageFile(event.target.files[0]);
            }}
          />
          <button
            className={[classes.btn, classes.unload].join(" ")}
            onClick={() =>
              Unloadfile(value.id_file).then(() => dispatch(GetTask()))
            }
          >
            unload
          </button>
        </label>
      )}
    </li>
  );
};

export default Task;
