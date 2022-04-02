import React, { useState } from 'react';
import { TAddTodoProps, TTodoLists,TToggleTodoLists } from './types';
import { TodoList } from './Components/TodoList';
import { AddTodoList } from './Components/AddTodoList';
import './App.css';

const initialTodoList: TTodoLists[] = [
  {thing: "study",isComplete: true,condition: "Complete"},
  {thing: "work",isComplete: false,condition: "Incomplete"}
]

function App() {
  const [todoLists,setTodoLists] = useState(initialTodoList);

  const addTodo: TAddTodoProps = newTodoList => {
    if(!newTodoList.trim()){
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
        condition: 'Incomplete'
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
      <h1>Todo List</h1>
      <AddTodoList addTodo={addTodo}/>
      <TodoList todoLists={todoLists} toggleTodoLists={toggleTodo}/>
    </div>
  );
}

export default App;
