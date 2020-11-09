import React, {useEffect, useReducer} from "react";
import s from "./Calculator.module.css";
import Display from "./Display/Display";
import Controls from "./Controls/Controls";
import { calcReducer, initialState } from "./state/calcReducer";
import {
    clearMemory,
    resetResult,
    setDot,
    setEquals,
    setLeftOperand,
    setOperator,
    setPlusMinus,
    setResult,
    setRightOperand, setValueFromMemory, setValueToMemory
} from "./state/actions";


const Calculator = () => {
    const [state, dispatch] = useReducer(calcReducer, initialState)
    useEffect(() => {
        console.log(state)
    }, [state])

    const handler = (value: string, type: string) => {
        switch (type) {
            case "digit": {
                state.operator ? dispatch(setRightOperand(value)) : dispatch(setLeftOperand(value))
                break
            }
            case "operator": {
                if(state.leftOperand && state.rightOperand && state.operator) {
                    dispatch(setEquals(state.leftOperand, state.rightOperand, state.operator, value))
                    dispatch(setDot(false))
                } else {
                    dispatch(setOperator(value))
                }
                break
            }
            case "func": {
                if(value === "=") {
                    dispatch(setResult(state.leftOperand, state.rightOperand, state.operator))
                } else if(value === ".") {
                    let leftDot = state.leftOperand === "0" ? "0." : "."
                    let rightDot = state.rightOperand === "" ? "0." : "."
                    !state.dot && dispatch(setDot(true))
                    state.operator ? !state.dot && dispatch(setRightOperand(rightDot)) : !state.dot && dispatch(setLeftOperand(leftDot))
                } else if(value === "AC") {
                    dispatch(resetResult())
                } else if(value === "+/-") {
                    dispatch(setPlusMinus())
                } else if(value === "m+") {
                    dispatch(setValueToMemory("+"))
                } else if(value === "m-") {
                    dispatch(setValueToMemory("-"))
                } else if(value === "mr") {
                    dispatch(setValueFromMemory())
                } else if(value === "mc") {
                    dispatch(clearMemory())
                }
            }
        }

    }


    return (
        <div className={s.body}>
            <Display display={state.result}/>
            <Controls handler={handler}/>
        </div>
    )
}

export default Calculator;