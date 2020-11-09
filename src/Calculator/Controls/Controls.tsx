import React from "react";
import Btn from "../common/Btn";
import s from "./Controls.module.css";
import {v1} from "uuid";

const buttons: BtnType[] = [
    {id: v1(), value: "AC", size: "small", bgColor: "light", icon: "AC", type: "func"},
    {id: v1(), value: "+/-", size: "small", bgColor: "light", icon: "+/-", type: "func"},
    {id: v1(), value: "%", size: "small", bgColor: "light", icon: "%", type: "operator"},
    {id: v1(), value: "/", size: "small", bgColor: "color", icon: "÷", type: "operator"},
    {id: v1(), value: "mc", size: "small", bgColor: "dark", icon: "mc", type: "func"},
    {id: v1(), value: "mr", size: "small", bgColor: "dark", icon: "mr", type: "func"},
    {id: v1(), value: "m-", size: "small", bgColor: "dark", icon: "m-", type: "func"},
    {id: v1(), value: "m+", size: "small", bgColor: "color", icon: "m+", type: "func"},
    {id: v1(), value: "7", size: "small", bgColor: "dark", icon: "7", type: "digit"},
    {id: v1(), value: "8", size: "small", bgColor: "dark", icon: "8", type: "digit"},
    {id: v1(), value: "9", size: "small", bgColor: "dark", icon: "9", type: "digit"},
    {id: v1(), value: "*", size: "small", bgColor: "color", icon: "×", type: "operator"},
    {id: v1(), value: "4", size: "small", bgColor: "dark", icon: "4", type: "digit"},
    {id: v1(), value: "5", size: "small", bgColor: "dark", icon: "5", type: "digit"},
    {id: v1(), value: "6", size: "small", bgColor: "dark", icon: "6", type: "digit"},
    {id: v1(), value: "-", size: "small", bgColor: "color", icon: "–", type: "operator"},
    {id: v1(), value: "1", size: "small", bgColor: "dark", icon: "1", type: "digit"},
    {id: v1(), value: "2", size: "small", bgColor: "dark", icon: "2", type: "digit"},
    {id: v1(), value: "3", size: "small", bgColor: "dark", icon: "3", type: "digit"},
    {id: v1(), value: "+", size: "small", bgColor: "color", icon: "+", type: "operator"},
    {id: v1(), value: "0", size: "large", bgColor: "dark", icon: "0", type: "digit"},
    {id: v1(), value: ".", size: "small", bgColor: "dark", icon: ",", type: "func"},
    {id: v1(), value: "=", size: "small", bgColor: "color", icon: "=", type: "func"},
]

export type BtnType = {
    id: string
    value: string
    size: string
    bgColor: string
    icon: string
    type: string
}

type PropsType = {
    handler: (value: string, type: string) => void
}

const Controls: React.FC<PropsType> = ({handler}) => {
    const btns = buttons.map(el => {
        return (
            <Btn key={el.id} data={el} handler={handler}/>
        )
    })

    return (
        <div className={s.controls}>
            {btns}
        </div>
    )
}

export default Controls;