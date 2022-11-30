import React, { useEffect, useState } from "react";

import classes from "../style/styles.module.css";

// все составляющие Content
import Form from "../components/Form/Form";
import Sorting from "../components/Sorting/Sorting";
import Tasks from "../components/Tasks/Tasks";

import { GetTask } from "../Redux/reducers/GetTask";
import {useDispatch } from "react-redux";

const ToDoList = () => {
  const [filterSelector, setfilterSelector] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTask());
  }, []);

  return (
    <section className={classes.Content}>
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
