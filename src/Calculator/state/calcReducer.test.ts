import { calcReducer, initialState } from "./calcReducer";
import {
    resetResult,
    setDot,
    setEquals,
    setLeftOperand,
    setOperator,
    setPlusMinus,
    setResult,
    setRightOperand, setValueFromMemory, setValueToMemory
} from "./actions";

test('value should be added to the leftOperand and to the result, but not to the rightOperand', () => {

    const action = setLeftOperand("10");
    const state = calcReducer(initialState, action)

    expect(state.leftOperand).toBe("10");
    expect(state.result).toBe("10");
    expect(state.rightOperand).toBe("");
});

test('value should be added to the rightOperand and to the result, but not to the leftOperand', () => {

    const action = setRightOperand("10");
    const state = calcReducer(initialState, action)

    expect(state.leftOperand).toBe("0");
    expect(state.result).toBe("10");
    expect(state.rightOperand).toBe("10");
});

test('should be correctly calculated', () => {

    const action = setResult("10", "5", "-");
    const state = calcReducer(initialState, action)

    expect(state.leftOperand).toBe("5");
    expect(state.result).toBe("5");
    expect(state.rightOperand).toBe("");
});

test('operator should be correctly added', () => {

    const action = setOperator("-");
    const state = calcReducer(initialState, action)

    expect(state.operator).toBe("-");
});

test('operator should be correctly added and expression should be correctly calculated', () => {

    const action = setEquals("10", "2", "*", "-");
    const state = calcReducer(initialState, action)

    expect(state.result).toBe("20");
    expect(state.operator).toBe("-");
});

test('dot flag should be changed', () => {

    const action = setDot(true);
    const state = calcReducer(initialState, action)

    expect(state.dot).toBe(true);
});

test('state should be reset', () => {

    const action = resetResult();
    const state = calcReducer(initialState, action)

    expect(state.result).toBe("0");
    expect(state.leftOperand).toBe("0");
    expect(state.rightOperand).toBe("");
    expect(state.operator).toBe("");
});

test('value should be changed to opposite', () => {

    const action = setPlusMinus();
    const newState = calcReducer(initialState, setLeftOperand("5"))
    const state = calcReducer(newState, action)

    expect(state.result).toBe("-5");
    expect(state.leftOperand).toBe("-5");
});

test('value should be saved with current operand', () => {

    const action = setValueToMemory("-");
    const newState = calcReducer(initialState, setLeftOperand("10"))
    const state = calcReducer(newState, action)

    expect(state.memory).toBe("-10");
});

test('value should be returned from memory', () => {

    const action = setValueFromMemory();
    const newState = calcReducer(initialState, setValueToMemory("-"))
    const state = calcReducer(newState, action)

    expect(state.memory).toBe("0");
});