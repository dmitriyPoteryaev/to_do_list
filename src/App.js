import classes from "./style/styles.module.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ToDoList from "./page/ToDoList";

export default function App() {
  return (
    <main className={classes.App}>
      <BrowserRouter>
        <Routes>
          <Route path="ToDoList" element={<ToDoList />} />
          <Route path="*" element={<ToDoList />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
