import React, {useState} from "react";
import s from "./Calculator.module.css";
import Display from "./Display/Display";
import Controls from "./Controls/Controls";


let leftOperand:string = "0"  //переменная хранит первый операнд
let rightOperand:string = ""  //переменная хранит второй операнд
let operator:string = "" //переменная хранит оператор

const Calculator = () => {
    const [result, setResult] = useState<string>("0") //состояние выводится на экран

    //функция выполняет операцию
    const calculate = () => {
        let equals = eval(leftOperand + operator + rightOperand) //записывает результат операции
        leftOperand = equals //присваиваем первому операнду результат вычислений
        rightOperand = "" //обнуляем второй операнд
        setResult(equals) //сетаем результат вычисления
    }

    //функция добавляет точку
    const addDot = () => {
        //определяем с каким оператором работаем (левый или правый)
        if(operator) {
            rightOperand = !rightOperand.includes(".") //проверка на наличие "." чтобы не поставить больше одной
                ? rightOperand + "."
                : rightOperand

            rightOperand = rightOperand[0] === "." // если в пустое значение добавляем "." то ставим "0" перед ней
                ? "0" + rightOperand
                : rightOperand

            setResult(rightOperand) // сетаем результат вычисления
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

    //хендлер нажатия кнопок
    const handler = (value: string, type: string) => {
        //проверка на какую кнопку нажали (цифра, операция, функция)
        switch (type) {
            case "digit": { // если цифра
                if(operator) { //если небыло операции то сетаем значение в левый операнд
                    rightOperand += value
                    setResult(rightOperand)
                } else { //если небыло операции то сетаем значение в правый операнд
                    leftOperand === "0" ? leftOperand = value : leftOperand += value //если состояние содержит "0" то перезаписываем
                    setResult(leftOperand)
                }
                break
            }
            case "operator": { // если оператор
                if(leftOperand && rightOperand && operator) { //если все переменные заполнены то запускаем расчет
                    calculate()
                    operator = value // после расчета записываем новый оператор
                } else {
                    operator = value // записываем оператор
                }
                break
            }
            case "func":  { // если функциональная кнопка в.т.ч. "="
                if(value === "=" && leftOperand && rightOperand && operator) { //если "=" то сччитаем
                    calculate()
                } else if (value === ",") { //если "." вызываем функцию с "."
                    addDot()
                }
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