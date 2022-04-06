import React from "react";
import "./Header.css";

interface IHeaderProps {
    title: string;
    method?: () => void;
    methodName: "add" | "save";
}

export const Header: React.FC<IHeaderProps> = ({ title,method,methodName }) => {
    return (
        <div className="header">
            {title}
            <span className="method">
                <button className="button" onClick={method}>{methodName == "add" ? "+" : "保存"}</button>                
            </span>
        </div>
    )
}   