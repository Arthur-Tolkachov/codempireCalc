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

export type setLeftOperandType = { type: typeof SET_LEFT_OPERAND, value: string }
export const setLeftOperand = (value: string): setLeftOperandType => ({type: SET_LEFT_OPERAND, value})

export type setRightOperandType = { type: typeof SET_RIGHT_OPERAND, value: string }
export const setRightOperand = (value: string): setRightOperandType => ({type: SET_RIGHT_OPERAND, value})

export type setResultType = { type: typeof SET_RESULT, a:string, b:string, o:string }
export const setResult = (a:string, b:string, o:string): setResultType => ({type: SET_RESULT, a, b, o})

export type setOperatorType = { type: typeof SET_OPERATOR, value: string }
export const setOperator = (value: string): setOperatorType => ({type: SET_OPERATOR, value})

export type setEqualsType = { type: typeof SET_EQUALS, a: string, b: string, o: string, value: string }
export const setEquals = (a: string, b: string, o: string, value: string): setEqualsType => ({
    type: SET_EQUALS,
    a,
    b,
    o,
    value
})

export type setDotType = { type: typeof SET_DOT, value: boolean }
export const setDot = (value: boolean): setDotType => ({type: SET_DOT, value})

export type resetResultType = { type: typeof RESET_RESULT }
export const resetResult = (): resetResultType => ({type: RESET_RESULT})

export type setPlusMinusType = { type: typeof SET_PLUS_MINUS }
export const setPlusMinus = (): setPlusMinusType => ({type: SET_PLUS_MINUS})

export type setValueToMemoryType = { type: typeof SET_VALUE_TO_MEMORY, value: string }
export const setValueToMemory = (value: string): setValueToMemoryType => ({type: SET_VALUE_TO_MEMORY, value})

export type setValueFromMemoryType = { type: typeof SET_VALUE_FROM_MEMORY }
export const setValueFromMemory = (): setValueFromMemoryType => ({type: SET_VALUE_FROM_MEMORY})

export type clearMemoryType = { type: typeof CLEAR_MEMORY }
export const clearMemory = (): clearMemoryType => ({type: CLEAR_MEMORY})