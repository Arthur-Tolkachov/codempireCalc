import React from "react";
import s from "./Btn.module.css";
import {BtnType} from "../Controls/Controls";

type PropsType = {
    data: BtnType
    handler: (value: string, type: string) => void
}

const Btn: React.FC<PropsType> = ({data, handler}) =>
    <div className={`${s.btnWrapper} ${s[data.size]}`}>
        <button onClick={() => handler(data.value, data.type)} className={`${s.btn} ${s[data.size]} ${s[data.bgColor]}`}>{data.icon}</button>
    </div>

export default Btn;