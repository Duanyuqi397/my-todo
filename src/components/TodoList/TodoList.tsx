import React, { useEffect, useState } from "react";
import { TTodoLists,TToggleTodoLists } from "../../types";
import { Header } from "../Header/Header";

interface ITodoLists {
    todoLists: TTodoLists[];
    toggleTodoLists: TToggleTodoLists;
}

const conditions:string[] = [
    "all",
    "recentThreeDays",
    "recentWeek"
]

export const TodoList: React.FC<ITodoLists> = ({ todoLists,toggleTodoLists }) => {
    const [filterTodoLists,setFilterTodoLists] = useState(todoLists);

    useEffect(() => {
        setFilterTodoLists(todoLists);
    },[todoLists])

    const handleClick = (item: string) => {
        if(item === "all"){
            setFilterTodoLists(todoLists);
        }else if(item === "recentThreeDays"){
            const filter = todoLists.filter(todoList => {
                const startTime = new Date(todoList.startTime).getTime();
                const endTime = new Date(todoList.endTime).getTime();
                const days = (endTime - startTime)/1000/3600/24; 
                return days < 3;
            });
            setFilterTodoLists(filter);
        }else if(item === "recentWeek"){
            const filter = todoLists.filter(todoList => !todoList.isComplete);
            setFilterTodoLists(filter);
        }
    }

    return (
        <div>
            <Header title="备忘录" methodName="add"/>
            {
                conditions.map(item => {
                    return <button key={item} onClick={() => handleClick(item)} >{item.toUpperCase()}</button>
                })
            }
            {
                filterTodoLists.map(filterTodoList => {
                    return <div key={filterTodoList.thing}>
                        <span style={{margin:5,textDecoration:filterTodoList.isComplete ? 'line-through' : 'none'}}>{`${filterTodoList.thing} ${filterTodoList.endTime} ${filterTodoList.remindTime}`}</span>
                        <input type="checkbox" checked={filterTodoList.isComplete} onChange={() => toggleTodoLists(filterTodoList)}/>
                    </div>
                })       
            }
        </div>
    )
}