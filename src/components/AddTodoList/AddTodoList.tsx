import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ITodoLists, TAddTodoProps } from "../../types";
import { Header } from "../Header/Header";
import right from "../../assets/right.png";
import down from "../../assets/down.png";
import "./AddTodoList.css";

interface IAddTodoForm {
  addTodo: TAddTodoProps;
  changeStatus: (newStatus: number) => void;
  filterTodoList?: ITodoLists;
}

export const AddTodoList: React.FC<IAddTodoForm> = ({
  addTodo,
  changeStatus,
  filterTodoList,
}) => {
  const [newTodoList, setNewTodoList] = useState(filterTodoList?.thing || "");
  const [newEndTime, setNewEndTime] = useState(
    filterTodoList?.endTime.replace(" ", "T") || ""
  );
  const [direction, setDirection] = useState(true);
  const [remindConditions, setRemindConditions] = useState([
    { title: "不提醒", isSelected: false, isDisabled: false },
    { title: "事件发生时", isSelected: false, isDisabled: false },
    { title: "5分钟前", isSelected: false, isDisabled: false },
    { title: "15分钟前", isSelected: false, isDisabled: false },
    { title: "30分钟前", isSelected: false, isDisabled: false },
    { title: "1小时前", isSelected: false, isDisabled: false },
    { title: "2小时前", isSelected: false, isDisabled: false },
    { title: "1天前", isSelected: false, isDisabled: false },
    { title: "1周前", isSelected: false, isDisabled: false },
    { title: "自定义", isSelected: false, isDisabled: false },
  ]);
  const handleNewEndTime = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setNewEndTime(e.target.value);
  };

  const saveNewTodoList = () => {
    const selectedCondition = remindConditions.filter(remindCondition => {
        return remindCondition.isSelected === true;
    });
    const selectedConditionTitle = selectedCondition.map((item) => {
        return item.title
    })
    addTodo(newTodoList, newEndTime,selectedConditionTitle);
    setNewTodoList("");
    setNewEndTime("");
    changeStatus(2);
  };

  const handleChangeDirection = () => {
    setDirection(!direction);
  };
  const handleChangeIsSelected = (index: number) => {
    // setRemindConditions
    let t = remindConditions.slice();
    let titleList:any = [];
    //全选和非全选
    if (index === 0) {
      t[index].isSelected = !t[index].isSelected;
      if (t[index].isSelected) {
        t = t.map((item, i) => {
          if (i !== 0) {
            item.isDisabled = true;
            item.isSelected = false;
          }
          return item;
        });
      } else {
        t = t.map((item, i) => {
          if (i !== 0) {
            item.isDisabled = false;
          }
          return item;
        });
      } 
      setRemindConditions(t);
    } else {
        t[index].isSelected = !t[index].isSelected;
        if (t[index].isSelected) {
            t = t.map((item, i) => {
              if (i == 0) {
                item.isDisabled = true;
                item.isSelected = false;
              }
              return item;
            });
          } else {
            t = t.map((item, i) => {
              if (i == 0) {
                item.isDisabled = false;
                // item.isSelected = true;
              }
              return item;
            });
          } 
        setRemindConditions(t);
        console.log(remindConditions)
    }
  };

  const returnMethod = () => {
    changeStatus(2);
  };

  const handleChange = (e: any) => {
    console.log(e);
    setNewTodoList(e.target.value);
  };

  return (
    <div className="header-all">
      <Header
        title="日程提醒"
        methodName="save"
        method={saveNewTodoList}
        returnMethod={returnMethod}
      />
      <div style={{ position: "relative" }}>
        <div className="title">日期</div>
        <input
          className="date-choose"
          type="datetime-local"
          value={newEndTime}
          onChange={handleNewEndTime}
        />
        <img src={right} className="date-choose-img" alt="" />
      </div>
      <div>
        <div className="title" style={{ margin: "0px" }}>
          内容
        </div>
        {/* <input type='textarea' className="content" value={newTodoList} onChange={handleChange} /> */}
        <textarea
          className="content"
          value={newTodoList}
          onChange={handleChange}
        ></textarea>
      </div>
      <div style={{ position: "relative", backgroundColor: "white" }}>
        <div className="title" style={{ marginBottom: "0px" }}>
          提醒
        </div>
        <span className="direction" onClick={handleChangeDirection}>
          <span style={{color:'grey'}}>请选择</span>
          <img
            src={direction ? right : down}
            style={{ width: "15px", height: "15px" }}
          />
        </span>
        <div>
          <div style={{ display: direction ? "none" : "block" }}>
            {remindConditions.map((item, index) => {
              return (
                <div key={index} style={{ textAlign: "left" }}>
                  <input
                    type="checkbox"
                    style={{ marginLeft: "10px" }}
                    disabled={item.isDisabled}
                    onClick={() => handleChangeIsSelected(index)}
                  />
                  <div className="remind-condition">{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <input type="text" value={newTodoList} onChange={handleChange}/>
        <button style={{marginLeft:10}} onClick={handleClick}>Add</button> */}
    </div>
  );
};
