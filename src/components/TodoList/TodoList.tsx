import React, { useEffect, useRef, useState } from "react";
import { ITodoLists,TAddTodoProps,TToggleTodoLists } from "../../types";
import { AddTodoList } from "../AddTodoList/AddTodoList";
import { Header } from "../Header/Header";
import "./TodoList.css";

interface ITodoListsProps {
    todoLists: ITodoLists[];
    toggleTodoLists?: TToggleTodoLists;
}

const conditions:string[] = [
    "全部",
    "最近三天",
    "最近一周"
]

export const TodoList: React.FC<ITodoListsProps> = ({ todoLists,toggleTodoLists }) => {
    const [filterTodoLists,setFilterTodoLists] = useState(todoLists);

    useEffect(() => {
        setFilterTodoLists(todoLists);
    },[todoLists])

    const handleClick = (item: string) => {
        if(item === "全部"){
            setFilterTodoLists(todoLists);
        }else if(item === "最近三天"){
            const filter = todoLists.filter(todoList => {
                const startTime = new Date(todoList.startTime).getTime();
                const endTime = new Date(todoList.endTime).getTime();
                const days = (endTime - startTime)/1000/3600/24; 
                return days < 3;
            });
            setFilterTodoLists(filter);
        }else if(item === "最近一周"){
            const filter = todoLists.filter(todoList => {
                const startTime = new Date(todoList.startTime).getTime();
                const endTime = new Date(todoList.endTime).getTime();
                const days = (endTime - startTime)/1000/3600/24; 
                return days < 7;
            });
            setFilterTodoLists(filter);
        }
    }

    const addNewTodoList = () => {
        // setIsDisplayed(!isDisplayed);
        // setAddTodoListIsDisplayed(true);
        // toggleTodoLists(filterTodoList,2);
    }

    const returnMethod = () => {
        
    }

    return (    
    <div> 
                <Header title="备忘录" methodName="add" method={addNewTodoList} returnMethod={returnMethod}/>
                <div style={{ width:'520px',height:'30px',display:'inline-flex',flexDirection:"row",justifyContent:'space-between',alignItems:'center' }}>
                {/* <div style={{ width:'33%',height:'30px',display:'inline-block' }}> */}
                {
                    conditions.map((item,index) => {
                        return (
                            <div key={index} style={{ display:'flex',width:'33%',justifyContent:'center' }}>
                                <button key={item} onClick={() => handleClick(item)} style={{backgroundColor:'#F7F4F8',border:'none',color:'grey'}} >{item.toUpperCase()}</button>
                            </div>
                        )
                    })
                }
                </div>
                {
                    filterTodoLists.map(filterTodoList => {
                        return <div key={filterTodoList.thing} className="todo-list" >
                            <div style={{margin:5}} className="thing">{`${filterTodoList.thing}`}</div>
                            <div key={filterTodoList.thing} className="end-time" >{filterTodoList.endTime}</div>
                            {/* <input type="checkbox" checked={filterTodoList.isComplete} onChange={() => toggleTodoLists(filterTodoList)}/> */}
                        </div>
                    })       
                }
            </div>
    )
}