import React, { useState,useEffect } from "react";
import classes from "./Tasks.module.css";
import { ContentServies } from "../../API/ContentServies.js";
import {ref, uploadBytes} from  "firebase/storage";
import { useSelector, useDispatch } from "react-redux";



import { GetTask } from "../../Redux/reducers/GetTask";


const BlockOfTask = ({ value, removeTask, changeStatus, changeValue }) => {
  const [fileUpload, setImageFile] = useState(null);

  const storage  = useSelector((state) => state.tasks.storage);

  console.log(storage.map(elem=>elem.url))
  const dispatch = useDispatch();


  async function  Unloadfile() {


if(fileUpload===null){

  return;
}
else{

 

 const fileRef=  ref(ContentServies.getApp(), `${value.id_file}`);
try{



await uploadBytes(fileRef, fileUpload)
}
catch(e){
alert(e)

}
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
            value={value.Desctiption}
            id="value"
            className={classes.Task__files}
            onChange={(event) => changeValue(value.id, event.target.value)}
          />
        </label>
        <button className={classes.remBut} onClick={() => removeTask(value.id)}>
          remove
        </button>
      </div>
      {/* 3 строка */}
      {storage.map(elem=>elem.name).some(elem=>elem==value.id_file)
?
<a href={storage.find(elem=>elem.name==value.id_file).url}>Посмотреть файл</a>
      :
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
        <button onClick={() => Unloadfile(value.id).then(()=>dispatch(GetTask()))}>Unload Image</button>
      </label>


      }
      
    </li>
  );
};

export default BlockOfTask;
