import React from "react";
import { Header } from "../Header/Header";
import { ITodoLists } from "../../types";
import { RemindTime } from "../../utils/RemindTime";
import "./RemindList.css";

interface IRemindListProps {
    remindLists: ITodoLists[];
}

export const RemindList: React.FC<IRemindListProps> = ({remindLists}) => {
    const now = new Date();
    return (
        <div>
            <Header title="日程提醒" methodName="add"/>
            <div className="time-style-1">
                <span style={{color:'black'}}>{`当前时间 ${('' + (now.getFullYear()))}年${('' + (now.getMonth() + 101)).substring(1)}月${('' + (now.getDate() + 100)).substring(1)}日 `}</span>
                <span className="time-style-2">{` ${('' + (now.getHours() + 100)).substring(1,2)} `}</span>
                <span className="time-style-2">{` ${('' + (now.getHours() + 100)).substring(2,3)} `}</span> : 
                <span className="time-style-2">{` ${('' + (now.getMinutes() + 100)).substring(1,2)} `}</span>
                <span className="time-style-2">{` ${('' + (now.getMinutes() + 100)).substring(2,3)} `}</span>
            </div>
            <div>
                {
                    remindLists.map((remindList,index) => {
                        return (
                            <div key={index} className="remind-list">
                                <div style={{color:'black',fontSize:'larger'}}>
                                    {remindList.endTime}
                                </div>
                                <div style={{display:'inline-block'}}>
                                <span style={{display:'inline-block',width:'260px'}}>内容: {remindList.thing}</span>
                                {
                                    (new Date(remindList.endTime).getTime() - new Date(remindList.startTime).getTime())/1000/3600/24 < 0 ? 
                                    <span style={{position:'absolute',right:'8px',top:'0px',color:'grey'}}>已结束</span> : 
                                    <span style={{position:'absolute',right:'8px',top:'0px',color:'#6865E7'}}>{`${RemindTime(now,remindList.endTime)}`}</span>
                                }

                                
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}