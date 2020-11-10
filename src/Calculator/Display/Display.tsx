import React from "react";
import s from "./Display.module.css";

type PropsType = {
    display: string
}

const Display: React.FC<PropsType> = ({display}) => {

    const fontSize = display.length <= 6 ? "5em" : display.length <= 11 ? "3em" : "1.5em"

    return (
        <div className={`${s.display}`} style={{fontSize}}>
            {display}
        </div>
    )
}

export default Display;