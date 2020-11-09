import React, {useState} from "react";
import s from "./Calculator.module.css";
import Display from "./Display/Display";
import Controls from "./Controls/Controls";


let leftOperand: string = "0"
let rightOperand: string = ""
let operator: string = ""

const Calculator = () => {
    const [result, setResult] = useState<string>("0")
    const [memory, setMemory] = useState<string>("")

    const calculationHelper = (operator:string, leftOperand:string, rightOperand:string) => Function('return ' + leftOperand + operator + rightOperand)()
    const calculate = () => {
        let equals: string = ""
        equals = operator === "%" ? `${+rightOperand * +leftOperand / 100}` : calculationHelper(operator, leftOperand, rightOperand)
        rightOperand = ""
        //@ts-ignore
        if(equals !== Infinity) {
            leftOperand = `${equals}`
            return equals
        }
        leftOperand = "0"
        return "0"
    }


    const addDot = () => {
        if (operator) {
            rightOperand = !rightOperand.includes(".")
                ? rightOperand + "."
                : rightOperand

            rightOperand = rightOperand[0] === "."
                ? "0" + rightOperand
                : rightOperand

            setResult(rightOperand)
        } else {
            leftOperand = !leftOperand.includes(".")
                ? leftOperand + "."
                : leftOperand
            leftOperand = leftOperand[0] === "."
                ? "0" + leftOperand
                : leftOperand

            setResult(leftOperand)
        }
    }

    const enterDigit = (value: string) => {
        if (operator) {
            rightOperand += value
            setResult(rightOperand)
        } else {
            leftOperand === "0" ? leftOperand = value : leftOperand += value
            setResult(leftOperand)
        }
    }

    const enterOperator = (value: string) => {
        leftOperand && rightOperand && operator
            ? setResult(calculate())
            : leftOperand = result
        operator = value
    }

    const enterFunc = (value: string) => {
        switch(value) {
            case "=": {
                if(leftOperand && rightOperand && operator) {
                    setResult(calculate())
                    operator = ""
                    leftOperand = ""
                }
                break
            }
            case ",": {
                addDot()
                break
            }
            case "AC": {
                leftOperand = "0"
                rightOperand = ""
                operator = ""
                setResult("0")
                break
            }
            case "+/-": {
                setResult(`${-result}`)
                if (operator) {
                    rightOperand = `${-rightOperand}`
                } else {
                    leftOperand = `${-leftOperand}`
                }
                break
            }
            case "m+": {
                setMemory(result)
                break
            }
            case "m-": {
                setMemory(`${-result}`)
                break
            }
            case "mr": {
                memory && setResult(memory)
                if (operator) {
                    rightOperand = memory
                } else {
                    leftOperand = memory
                }
                break
            }
            case "mc": {
                setMemory("")
            }
        }
    }

    const handler = (value: string, type: string) => {
        switch (type) {
            case "digit": {
                enterDigit(value)
                break
            }
            case "operator": {
                enterOperator(value)
                break
            }
            case "func": {
                enterFunc(value)
            }
        }
    }


    return (
        <div className={s.body}>
            <Display display={result}/>
            <Controls handler={handler}/>
        </div>
    )
}

export default Calculator;