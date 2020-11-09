import {
    clearMemoryType,
    resetResultType,
    setDotType,
    setEqualsType,
    setLeftOperandType,
    setOperatorType,
    setPlusMinusType,
    setResultType,
    setRightOperandType,
    setValueFromMemoryType,
    setValueToMemoryType
} from "./actions";
import {
    CLEAR_MEMORY,
    RESET_RESULT,
    SET_DOT,
    SET_EQUALS,
    SET_LEFT_OPERAND,
    SET_OPERATOR, SET_PLUS_MINUS,
    SET_RESULT,
    SET_RIGHT_OPERAND, SET_VALUE_FROM_MEMORY, SET_VALUE_TO_MEMORY
} from "./constants";

type StateType = {
    leftOperand: string
    rightOperand: string
    operator: string
    result: string
    dot: boolean
    memory: string
}

type ActionType =
    setLeftOperandType
    | setResultType
    | setRightOperandType
    | setOperatorType
    | setEqualsType
    | setDotType
    | resetResultType
    | setPlusMinusType
    | setValueToMemoryType
    | setValueFromMemoryType
    | clearMemoryType

export const initialState: StateType = {
    leftOperand: "0",
    rightOperand: "",
    operator: "",
    result: "0",
    dot: false,
    memory: "",
}

export const calcReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_RESULT: {
            if (action.a && action.b && action.o) {
                let b: string = ""
                let o: string = ""
                if (+action.b < 0 && action.o === "-") {
                    b = `${+action.b - +action.b * 2}`
                    o = "+"
                } else {
                    b = action.b
                    o = action.o
                }
                let expression = `${eval(action.a + o + b)}`
                if (action.o === "%") {
                    expression = `${+action.a * +b / 100}`
                }
                let dot = expression.includes(".")
                return {...state, result: expression, leftOperand: expression, operator: "", rightOperand: "", dot: dot}
            }
            return state
        }
        case SET_LEFT_OPERAND: {
            if (state.leftOperand === "0") {
                return {...state, leftOperand: action.value, result: action.value}
            }
            return {...state, leftOperand: state.leftOperand + action.value, result: state.result + action.value}
        }
        case SET_RIGHT_OPERAND: {
            if (state.rightOperand && state.rightOperand !== "0") {
                return {...state, rightOperand: state.rightOperand + action.value, result: state.result + action.value}
            } else if (!state.rightOperand || state.rightOperand === "0") {
                return {...state, rightOperand: action.value, result: action.value}
            }
            return state
        }
        case SET_OPERATOR: {
            return {...state, operator: action.value, dot: false}
        }
        case SET_EQUALS: {
            let b: string = ""
            let o: string = ""
            if (+action.b < 0 && action.o === "-") {
                b = `${+action.b - +action.b * 2}`
                o = "+"
            } else {
                b = action.b
                o = action.o
            }
            let expression = `${eval(action.a + o + b)}`
            if (action.o === "%") {
                expression = `${+state.leftOperand * +state.rightOperand / 100}`
            }
            //@ts-ignore
            if (expression !== Infinity) {
                return {...state, result: expression, leftOperand: expression, rightOperand: "", operator: action.value}
            }
            return {...state, result: "0", leftOperand: "0", rightOperand: "", operator: action.value}
        }
        case SET_DOT: {
            return {...state, dot: action.value}
        }
        case RESET_RESULT: {
            return {...initialState, memory: state.memory}
        }
        case SET_PLUS_MINUS: {
            if (state.operator) {
                return {
                    ...state,
                    rightOperand: `${+state.rightOperand - +state.rightOperand * 2}`,
                    result: `${+state.result - +state.result * 2}`
                }
            }
            return {
                ...state,
                leftOperand: `${+state.leftOperand - +state.leftOperand * 2}`,
                result: `${+state.result - +state.result * 2}`
            }
        }

        case SET_VALUE_TO_MEMORY: {
            if (action.value === "+") {
                let value = +state.result > 0 ? state.result : `${+state.result - +state.result * 2}`
                return {...state, memory: value}
            } else {
                let value = +state.result > 0 ? `${+state.result - +state.result * 2}` : state.result
                return {...state, memory: value}
            }
        }

        case SET_VALUE_FROM_MEMORY: {
            let dot = state.memory.includes(".")
            if(state.memory) {
                return {...state, result: state.memory, leftOperand: state.memory, rightOperand: "", dot: dot}
            } return state
        }

        case CLEAR_MEMORY : {
            return {...state, memory: ""}
        }

        default:
            return state
    }
}

