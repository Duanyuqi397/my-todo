import React from "react";
import { Header } from "../Header/Header";
import { ITodoLists } from "../../types";
import { RemindTime } from "../../utils/RemindTime";
import "./RemindList.css";

interface IRemindListProps {
    remindLists: ITodoLists[];
    changeStatus: (newStatus:number) => void;
}

export const RemindList: React.FC<IRemindListProps> = ({remindLists,changeStatus}) => {
    const now = new Date();

    const returnMethod = () => {
        changeStatus(2);
    }

    const method = () => {
        changeStatus(1);
    }

    return (
        <div style={{position:'relative'}}>
            <Header title="日程提醒" methodName="add" returnMethod={returnMethod} method={method}/>
            <div style={{backgroundColor:'#6765E6',height:'40px',width:'100%',border:'none',position:'absolute',top:'80px'}} />
            <div className="time-style-1">
                <span style={{color:'grey',fontWeight:500,fontSize:'16px'}}>{`当前时间 ${('' + (now.getFullYear()))}年${('' + (now.getMonth() + 101)).substring(1)}月${('' + (now.getDate() + 100)).substring(1)}日 `}</span>
                <span className="time-style-2">{` ${('' + (now.getHours() + 100)).substring(1,2)} `}</span>
                <span className="time-style-2">{` ${('' + (now.getHours() + 100)).substring(2,3)} `}</span> : 
                <span className="time-style-2">{` ${('' + (now.getMinutes() + 100)).substring(1,2)} `}</span>
                <span className="time-style-2">{` ${('' + (now.getMinutes() + 100)).substring(2,3)} `}</span>
            </div>
            <div style={{marginTop:'80px'}}>
                {   
                    remindLists.filter(t => t.remindCondition[0] !== '不提醒').map((remindList,index) => {
                        return (
                            <div key={index} className="remind-list">
                                <div style={{color:'black',fontSize:'22px',fontWeight:'600',marginBottom:'5px'}}>
                                    {remindList.endTime}
                                </div>
                                <div style={{display:'inline-block'}}>
                                <span style={{display:'inline-block',width:'250px',height:'22px',overflow:'hidden',fontSize:'16px',margin:'2px 0px'}}>内容： {remindList.thing}</span>
                                <span style={{display:'inline-block',width:'250px',height:'22px',fontSize:'16px',margin:'2px 0px'}}>提醒： {remindList.remindCondition[0]}</span>
                                {
                                    (new Date(remindList.endTime).getTime() - new Date(remindList.startTime).getTime())/1000/3600/24 < 0 ? 
                                    <span className="rest-time" >已结束</span> : 
                                    <span className="rest-time" style={{color:'#6865E7'}}>{`${RemindTime(now,remindList.endTime)}`}</span>
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