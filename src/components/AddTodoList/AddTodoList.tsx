import React, { ChangeEvent, useState } from "react";
import { TAddTodoProps } from "../../types";
import { Header } from "../Header/Header";
import "./AddTodoList.css";

interface IAddTodoForm {
    addTodo: TAddTodoProps;
}

const remindConditions = [
    '不提醒',
    '事件发生时',
    '5分钟前',
    '15分钟前',
    '30分钟前',
    '1小时前',
    '2小时前',
    '1天前',
    '1周前',
    '自定义'
]

export const AddTodoList: React.FC<IAddTodoForm> = ({ addTodo }) => {
    const [newTodoList,setNewTodoList] = useState('');
    const [newEndTime,setNewEndTime] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodoList(e.target.value);
    }

    const handleNewEndTime = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEndTime(e.target.value);
    }

    const saveNewTodoList = () => {
        addTodo(newTodoList,newEndTime);
        setNewTodoList('');
    }


    return (
        <div>
            <Header title="日程提醒" methodName="save" method={saveNewTodoList}/>
            <div>
                <div className="title">日期</div>   
                <input type="text" value={newEndTime} onChange={handleNewEndTime}/>    
            </div>
            <div>
                <div className="title" style={{margin:'0px'}}>内容</div>
                <input type="text" className="content" value={newTodoList} onChange={handleChange} />
            </div>
            <div>
                <div className="title">提醒</div>
                
            </div>
            {/* <input type="text" value={newTodoList} onChange={handleChange}/>
            <button style={{marginLeft:10}} onClick={handleClick}>Add</button> */}
        </div>
    )
}