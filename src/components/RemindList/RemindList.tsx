import React from "react";
import { Header } from "../Header/Header";
import { TTodoLists } from "../../types";
import "./RemindList.css";

interface IRemindListProps {
    remindLists: TTodoLists[];
}

export const RemindList: React.FC<IRemindListProps> = ({remindLists}) => {
    const now = new Date();
    return (
        <div>
            <Header title="日程提醒" methodName="add"/>
            <div className="time-style-1">
                <span style={{color:'black'}}>{`当前时间 ${('' + (now.getFullYear()))}年${('' + (now.getMonth() + 101)).substring(1)}月${('' + (now.getDate() + 100)).substring(1)}日`}</span>
                <span>{`${('' + (now.getHours() + 100)).substring(1,2)}`}</span>
                <span>{`${('' + (now.getHours() + 100)).substring(2,3)} : `}</span>
                <span>{`${('' + (now.getMinutes() + 100)).substring(1,2)}`}</span>
                <span>{`${('' + (now.getMinutes() + 100)).substring(2,3)}`}</span>
            </div>
            <div>
                {
                    remindLists.map((remindList,index) => {
                        return (
                            <div key={index} style={{marginLeft:'20px'}}>
                                {remindList.thing}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}