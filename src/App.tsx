import React, { useState,useRef } from 'react';
import { TAddTodoProps, ITodoLists,TToggleTodoLists } from './types';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoList } from './components/AddTodoList/AddTodoList';
import { FormatDate } from './utils/FormatDate';
import { RemindTime } from './utils/RemindTime';
import { RemindList } from './components/RemindList/RemindList';
import './App.css';

const initialTodoList: ITodoLists[] = [
  {thing: "客人从成都回来之后，要做个双眼皮手术，现在想做全鼻整形，需要你的专业知识，专业咨询建议",isComplete: true,condition: "Complete",startTime: FormatDate(new Date()),endTime:FormatDate(new Date("2022-10-06 18:19:20")),remindTime:RemindTime(FormatDate(new Date()),FormatDate(new Date("2022-10-06 18:19:20")))},
  {thing: "下午四点到粤秀整形开会",isComplete: false,condition: "Incomplete",startTime: FormatDate(new Date()),endTime:FormatDate(new Date("2022-04-09 18:19:20")),remindTime:RemindTime(FormatDate(new Date()),FormatDate(new Date("2022-04-09 18:19:20")))}
]

function App() {
  const [todoLists,setTodoLists] = useState(initialTodoList);
  const [status,setStatus] = useState(1);

  const changeStatus = (newStatus: number) => {
    setStatus(newStatus);
  }

  const addTodo: TAddTodoProps = (newTodoList,newEndTime) => {
    if(!newTodoList.trim() || !newEndTime){
      return;
    }
    //判断是否已有todoList与newTodoList.thing相同
    const hasSameTodoList = todoLists.some(TodoList => TodoList.thing === newTodoList.trim())
    if(hasSameTodoList){
      return;
    }

    setTodoLists([
      ...todoLists,
      {
        thing: newTodoList,
        isComplete: false,
        condition: 'Incomplete',
        startTime: FormatDate(new Date()),
        endTime: newEndTime,
        remindTime: RemindTime(FormatDate(new Date()),newEndTime)
      }
    ]);
  }

  const toggleTodo: TToggleTodoLists = (selectedTodoLists) => {
    const newTodoLists = todoLists.map(todoList => {
      if(todoList === selectedTodoLists){
        return {
          ...todoList,
          isComplete: !todoList.isComplete
        }
      }
      return todoList;
    })
    setTodoLists(newTodoLists);
  }

  return (
      <div className="App">
        {/* <TodoList todoLists={todoLists} toggleTodoLists={toggleTodo} />
        <RemindList remindLists={todoLists}/>
        <AddTodoList addTodo={addTodo} /> */}
      {
        status === 1 ? <AddTodoList addTodo={addTodo} changeStatus={changeStatus}/> : <TodoList todoLists={todoLists} toggleTodoLists={toggleTodo} />
      }
    </div>
  );
}

export default App;
