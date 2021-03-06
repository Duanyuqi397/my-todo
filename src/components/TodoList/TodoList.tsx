import React, { useEffect, useState } from "react";
import { ITodoLists, TAddTodoProps, TToggleTodoLists } from "../../types";
import { Header } from "../Header/Header";
import "./TodoList.css";

interface ITodoListsProps {
  todoLists: ITodoLists[];
  toggleTodoLists?: TToggleTodoLists;
  changeStatus: (newStatus: number, filterTodoList?: ITodoLists) => void;
}

const conditions: string[] = ["全部", "最近三天", "最近一周"];

export const TodoList: React.FC<ITodoListsProps> = ({
  todoLists,
  toggleTodoLists,
  changeStatus,
}) => {
  const [filterTodoLists, setFilterTodoLists] = useState(todoLists);

  useEffect(() => {
    setFilterTodoLists(todoLists);
  }, [todoLists]);

  const handleClick = (item: string) => {
    if (item === "全部") {
      setFilterTodoLists(todoLists);
    } else if (item === "最近三天") {
      const filter = todoLists.filter((todoList) => {
        const startTime = new Date(todoList.startTime).getTime();
        const endTime = new Date(todoList.endTime).getTime();
        const days = (endTime - startTime) / 1000 / 3600 / 24;
        return days < 3;
      });
      setFilterTodoLists(filter);
    } else if (item === "最近一周") {
      const filter = todoLists.filter((todoList) => {
        const startTime = new Date(todoList.startTime).getTime();
        const endTime = new Date(todoList.endTime).getTime();
        const days = (endTime - startTime) / 1000 / 3600 / 24;
        return days < 7;
      });
      setFilterTodoLists(filter);
    }
  };

  const addNewTodoList = () => {
    changeStatus(1);
  };

  const returnMethod = () => {
      changeStatus(3);
  };

  const toJump = (filterTodoList: ITodoLists) => {
    console.log(filterTodoList);
    changeStatus(1, filterTodoList);
  };

  return (
    <div>
      <Header
        title="备忘录"
        methodName="add"
        method={addNewTodoList}
        returnMethod={returnMethod}
      />
      <div className="condition-tab">
        {/* <div style={{ width:'33%',height:'30px',display:'inline-block' }}> */}
        {conditions.map((item, index) => {
          return (
            <div key={index} className="condition">
              <button
                key={item}
                onClick={() => handleClick(item)}
                className="condition-button"
              >
                {item.toUpperCase()}
              </button>
            </div>
          );
        })}
      </div>
      {filterTodoLists.map((filterTodoList) => {
        return (
          <div
            key={filterTodoList.thing}
            className="todo-list"
            onClick={() => {
              toJump(filterTodoList);
            }}
          >
            <div
              style={{ margin: 5,height:'43px',width:'468px',overflow:'hidden',zoom:1 }}
              className="thing"
            >{`${filterTodoList.thing}`}</div>
            <div key={filterTodoList.thing} className="end-time">
              {filterTodoList.endTime}
            </div>
            {/* <input type="checkbox" checked={filterTodoList.isComplete} onChange={() => toggleTodoLists(filterTodoList)}/> */}
          </div>
        );
      })}
    </div>
  );
};
