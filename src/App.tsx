import React, { useState } from 'react';
import { TAddTodoProps, TTodoLists,TToggleTodoLists } from './types';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoList } from './components/AddTodoList/AddTodoList';
import { FormatDate } from './utils/FormatDate';
import { RemindTime } from './utils/RemindTime';
import './App.css';

const initialTodoList: TTodoLists[] = [
  {thing: "study",isComplete: true,condition: "Complete",startTime: FormatDate(new Date()),endTime:FormatDate(new Date("2022-10-06 18:19:20")),remindTime:RemindTime(FormatDate(new Date()),FormatDate(new Date("2022-10-06 18:19:20")))},
  {thing: "work",isComplete: false,condition: "Incomplete",startTime: FormatDate(new Date()),endTime:FormatDate(new Date("2022-04-10 18:19:20")),remindTime:RemindTime(FormatDate(new Date()),FormatDate(new Date("2022-04-10 18:19:20")))}
]

function App() {
  const [todoLists,setTodoLists] = useState(initialTodoList);

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

  const toggleTodo: TToggleTodoLists = selectedTodoLists => {
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
      <AddTodoList addTodo={addTodo}/>
      <TodoList todoLists={todoLists} toggleTodoLists={toggleTodo}/>
    </div>
  );
}

export default App;
