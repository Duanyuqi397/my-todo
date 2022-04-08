import React, { useState, useRef } from "react";
import { TAddTodoProps, ITodoLists, TToggleTodoLists } from "./types";
import { TodoList } from "./components/TodoList/TodoList";
import { AddTodoList } from "./components/AddTodoList/AddTodoList";
import { FormatDate } from "./utils/FormatDate";
import { RemindTime } from "./utils/RemindTime";
import { RemindList } from "./components/RemindList/RemindList";
import "./App.css";

const initialTodoList: ITodoLists[] = [
  {
    thing:
      "客人从成都回来之后，要做个双眼皮手术，现在想做全鼻整形，需要你的专业知识，专业咨询建议",
    isComplete: true,
    condition: "Complete",
    startTime: FormatDate(new Date()),
    endTime: FormatDate(new Date("2022-10-06 18:19:20")),
    remindTime: RemindTime(
      FormatDate(new Date()),
      FormatDate(new Date("2022-10-06 18:19:20"))
    ),
    remindCondition:['1小时前']
  },
  {
    thing: "下午四点到粤秀整形开会",
    isComplete: false,
    condition: "Incomplete",
    startTime: FormatDate(new Date()),
    endTime: FormatDate(new Date("2022-04-09 18:19:20")),
    remindTime: RemindTime(
      FormatDate(new Date()),
      FormatDate(new Date("2022-04-09 18:19:20"))
    ),
    remindCondition:['不提醒']
  },
];

function App() {
  const [todoLists, setTodoLists] = useState(initialTodoList);
  const [status, setStatus] = useState(2);
  const [filterTodoList, setFilterTodoList] = useState<ITodoLists>();
  const changeStatus = (newStatus: number, filterTodoList?: ITodoLists) => {
    setStatus(newStatus);
    setFilterTodoList(filterTodoList);
  };

  const addTodo: TAddTodoProps = (newTodoList, newEndTime,newRemindCondition) => {
    if (!newTodoList.trim() || !newEndTime) {
      return;
    }
    //判断是否已有todoList与newTodoList.thing相同
    const hasSameTodoList = todoLists.some(
      (TodoList) => TodoList.thing === newTodoList.trim()
    );
    if (hasSameTodoList) {
      return;
    }

    setTodoLists([
      ...todoLists,
      {
        thing: newTodoList,
        isComplete: false,
        condition: "Incomplete",
        startTime: FormatDate(new Date()),
        endTime: newEndTime.replace("T", " "),
        remindTime: RemindTime(FormatDate(new Date()), newEndTime),
        remindCondition: newRemindCondition
      },
    ]);
  };

  const toggleTodo: TToggleTodoLists = (selectedTodoLists) => {
    const newTodoLists = todoLists.map((todoList) => {
      if (todoList === selectedTodoLists) {
        return {
          ...todoList,
          isComplete: !todoList.isComplete,
        };
      }
      return todoList;
    });
    setTodoLists(newTodoLists);
  };
  const switchComp = () => {
    switch (status) {
      case 1:
        return (
          <AddTodoList
            addTodo={addTodo}
            filterTodoList={filterTodoList}
            changeStatus={changeStatus}
          />
        );
      case 2:
        return (
          <TodoList
            todoLists={todoLists}
            changeStatus={changeStatus}
            toggleTodoLists={toggleTodo}
          />
        );
      case 3:
        return (
          <RemindList remindLists={todoLists} changeStatus={changeStatus}/>
        )
      // <RemindList  remindLists={{}}/>
    }
  };
  return (
    <div className="App">
      {/* <TodoList todoLists={todoLists} toggleTodoLists={toggleTodo} />
        <RemindList remindLists={todoLists}/>
        <AddTodoList addTodo={addTodo} /> */}
      {switchComp()}
    </div>
  );
}

export default App;
