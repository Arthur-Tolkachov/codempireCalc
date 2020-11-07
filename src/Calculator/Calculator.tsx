import React, {useState} from "react";
import s from "./Calculator.module.css";
import Display from "./Display/Display";
import Controls from "./Controls/Controls";



const Calculator = () => {
    const [display, setDisplay] = useState <string>("0")
    const [calculate, setCalculate] = useState("")
    const [wasCalc, setWasCalc] = useState<boolean>(false)


    const handler = (value:string, type: string) => {
        switch (type) {
            case "digit": {
                display !== "0" ? setDisplay(display + value) : setDisplay(value)
                wasCalc && setWasCalc(false)
                !wasCalc ? setCalculate(calculate + value) : setCalculate(eval(display + value))
                break
            }
            case "calc": {
                !wasCalc ? setDisplay(display + value) : setDisplay(display.slice(0,-1) + value)
                !wasCalc && setWasCalc(true)
                setCalculate("")

                break
            }

            case "func": {
                if(value === "=") {
                    setDisplay(calculate || "0")
                }
                break
            }

            default: {
                alert("Something went wrong :(")
            }
        }
    }


    return (
        <div className={s.body}>
            <Display display={display} calculate={calculate}/>
            <Controls handler={handler}/>
        </div>
    )
}

export default Calculator;