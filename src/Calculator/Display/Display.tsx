import React from "react";
import s from "./Display.module.css";

type PropsType = {
    display: string
}

const Display: React.FC<PropsType> = ({display}) => {

    return (
        <div className={`${s.display}`}>
            {display}
        </div>
    )
}

export default Display;