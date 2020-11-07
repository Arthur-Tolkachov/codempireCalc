import React from "react";
import s from "./Display.module.css";

type PropsType = {
    display: string
    calculate: string
}

const Display: React.FC<PropsType> = ({display, calculate}) => {

    let fontSize = s.middle

    return (
        <div className={`${s.display} ${display.length > 7 && fontSize}`}>
            {display}
            <div className={s.calculate}>{calculate}</div>
        </div>
    )
}

export default Display;