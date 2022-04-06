import React, { ChangeEvent, useEffect, useState } from "react";
import { TAddTodoProps } from "../../types";
import { Header } from "../Header/Header";
import right from "../../assets/right.png";
import down from "../../assets/down.png";
import "./AddTodoList.css";

interface IAddTodoForm {
    addTodo: TAddTodoProps;
}

const remindConditions = [
    {title:'不提醒',isSelected: false,isDisabled: false},
    {title:'事件发生时',isSelected: false,isDisabled: false},
    {title:'5分钟前',isSelected: false,isDisabled: false},
    {title:'15分钟前',isSelected: false,isDisabled: false},
    {title:'30分钟前',isSelected: false,isDisabled: false},
    {title:'1小时前',isSelected: false,isDisabled: false},
    {title:'2小时前',isSelected: false,isDisabled: false},
    {title:'1天前',isSelected: false,isDisabled: false},
    {title:'1周前',isSelected: false,isDisabled: false},
    {title:'自定义',isSelected: false,isDisabled: false}
]

export const AddTodoList: React.FC<IAddTodoForm> = ({ addTodo }) => {
    const [newTodoList,setNewTodoList] = useState('');
    const [newEndTime,setNewEndTime] = useState('');
    const [direction,setDirection] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodoList(e.target.value);
    }

    const handleNewEndTime = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEndTime(e.target.value);
    }

    const saveNewTodoList = () => {
        addTodo(newTodoList,newEndTime);
        setNewTodoList('');
        setNewEndTime('');
    }

    const handleChangeDirection = () => {
        setDirection(!direction);
    }

    const handleChangeIsSelected = (index: number) => {
        if(remindConditions[index].title === '不提醒'){
            remindConditions.map((e) => {
                if(e.title !== '不提醒'){
                    e.isDisabled = true;
                }
            });
        }
        console.log(remindConditions);
        remindConditions[index].isSelected = !remindConditions[index].isSelected;
    }


    return (
        <div>
            <Header title="日程提醒" methodName="save" method={saveNewTodoList}/>
            <div style={{position: 'relative'}}>
                <div className="title">日期</div>   
                <input style={{position: 'absolute', right: '10px', top: '4px'}} type="text" value={newEndTime} onChange={handleNewEndTime}/>    
            </div>
            <div>
                <div className="title" style={{margin:'0px'}}>内容</div>
                <input type="text" className="content" value={newTodoList} onChange={handleChange} />
            </div>
            <div style={{position:'relative',backgroundColor:'white'}}>
                <div className="title" >提醒</div>
                <span className="direction" onClick={handleChangeDirection} > 
                    <span style={{marginBottom:'5px'}}>ssssssssssss</span>
                    <img src={direction ? right : down} style={{width:'20px',height:'20px'}}/>
                </span>
                <div>
                <ul style={{display:direction ? 'none' : 'block'}}>
                    {remindConditions.map((item,index) => {
                        return (
                            <div key={index} style={{textAlign:'left'}}>
                                <input type="checkbox" disabled={item.isDisabled} onClick={() => handleChangeIsSelected(index)}/>
                                <li style={{listStyleType:'none',display:'inline-block'}}>{item.title}</li>
                            </div>
                        )
                    })}
                </ul>
            </div>
            </div>
            {/* <input type="text" value={newTodoList} onChange={handleChange}/>
            <button style={{marginLeft:10}} onClick={handleClick}>Add</button> */}
        </div>
    )
}