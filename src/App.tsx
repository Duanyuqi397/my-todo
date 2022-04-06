import React, { useState } from 'react';
import { TAddTodoProps, TTodoLists,TToggleTodoLists } from './types';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoList } from './components/AddTodoList/AddTodoList';
import { FormatDate } from './utils/FormatDate';
import { RemindTime } from './utils/RemindTime';
import { RemindList } from './components/RemindList/RemindList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

const initialTodoList: TTodoLists[] = [
  {thing: "study",isComplete: true,condition: "Complete",startTime: FormatDate(new Date()),endTime:FormatDate(new Date("2022-10-06 18:19:20")),remindTime:RemindTime(FormatDate(new Date()),FormatDate(new Date("2022-10-06 18:19:20")))},
  {thing: "work",isComplete: false,condition: "Incomplete",startTime: FormatDate(new Date()),endTime:FormatDate(new Date("2022-04-09 18:19:20")),remindTime:RemindTime(FormatDate(new Date()),FormatDate(new Date("2022-04-09 18:19:20")))}
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
    <Router>
      <div className="App">
        {/* <Link to="/add-todo-list">
          <TodoList todoLists={todoLists} toggleTodoLists={toggleTodo}/>
        </Link> */}
      <Switch>
        <Route exact path="/">
          <TodoList todoLists={todoLists} toggleTodoLists={toggleTodo}/>
        </Route>
        <Route path="/add-todo-list">
          <AddTodoList addTodo={addTodo}/>
        </Route>
        <Route path="/remind-list">
          <RemindList remindLists={todoLists}/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
