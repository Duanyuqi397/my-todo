import React, { useEffect, useState } from "react";
import { TTodoLists,TToggleTodoLists } from "../types";

interface ITodoLists {
    todoLists: TTodoLists[];
    toggleTodoLists: TToggleTodoLists;
}

const conditions:string[] = [
    "All",
    "isCompleted",
    "Incomplete"
]

export const TodoList: React.FC<ITodoLists> = ({ todoLists,toggleTodoLists }) => {
    const [filterTodoLists,setFilterTodoLists] = useState(todoLists);

    useEffect(() => {
        setFilterTodoLists(todoLists);
    },[todoLists])

    const handleClick = (item: string) => {
        if(item === "All"){
            setFilterTodoLists(todoLists);
        }else if(item === "isCompleted"){
            const filter = todoLists.filter(todoList => todoList.isComplete);
            setFilterTodoLists(filter);
        }else if(item === "Incomplete"){
            const filter = todoLists.filter(todoList => !todoList.isComplete);
            setFilterTodoLists(filter);
        }
    }

    return (
        <div>
            {
                conditions.map(item => {
                    return <button key={item} onClick={() => handleClick(item)} >{item.toUpperCase()}</button>
                })
            }
            {
                filterTodoLists.map(filterTodoList => {
                    return <div key={filterTodoList.thing}>
                        <span style={{margin:5,textDecoration:filterTodoList.isComplete ? 'line-through' : 'none'}}>{filterTodoList.thing}</span>
                        <input type="checkbox" checked={filterTodoList.isComplete} onChange={() => toggleTodoLists(filterTodoList)}/>
                    </div>
                })       
            }
        </div>
    )
}