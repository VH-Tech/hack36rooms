
import { Header } from "./My Components/Header"
import { Todos } from "./My Components/Todos"
import { AddTodo } from "./My Components/AddTodo"
import { Footer } from "./My Components/Footer"
import React, { useState, useEffect } from 'react';

export default function ClassesPage(props ) {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("This", todo, "will be deleted");
    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
  }

  const addTodo = (title, desc, time1, time2, time3, time4, time5, time6, time7) => {
    console.log("I am adding this link", title, desc,time1, time2, time3, time4, time5, time6, time7)
    let sno;
    if (todos.length == 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
      time1: time1,
      time2: time2,
      time3: time3,
      time4: time4,
      time5: time5,
      time6: time6,
      time7: time7,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo)
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
    </>
  );
}

