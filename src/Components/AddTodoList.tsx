import React, { ChangeEvent, useState } from "react";
import { TAddTodoProps } from "../types"

interface IAddTodoForm {
    addTodo: TAddTodoProps;
}

export const AddTodoList: React.FC<IAddTodoForm> = ({ addTodo }) => {
    const [newTodoList,setNewTodoList] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodoList(e.target.value);
    }

    const handleClick = () => {
        addTodo(newTodoList);
        setNewTodoList('');
    }

    return (
        <div style={{display:'inline'}}>
            <input type="text" value={newTodoList} onChange={handleChange}/>
            <button style={{marginLeft:10}} onClick={handleClick}>Add</button>
        </div>
    )
}