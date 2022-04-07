import React from "react";
import "./Header.css";
import left from "../../assets/left.png";

interface IHeaderProps {
    title: string;
    method?: () => void;
    methodName: "add" | "save";
    returnMethod?: () => void;
}

export const Header: React.FC<IHeaderProps> = ({ title,method,methodName,returnMethod }) => {
    return (
        <div className="header">
            <span className="back" onClick={returnMethod}>
                <img src={left} className="back-img"/>
            </span>
            {title}
            <span className="method">
                <button className="button" onClick={method}>{methodName == "add" ? "+" : "保存"}</button>                
            </span>
        </div>
    )
}   