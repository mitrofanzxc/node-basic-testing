import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
    test('should add two numbers', () => {
        const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });

        expect(result).toBe(3);
    });

    test('should subtract two numbers', () => {
        const result = simpleCalculator({ a: 1, b: 2, action: Action.Subtract });

        expect(result).toBe(-1);
    });

    test('should multiply two numbers', () => {
        const result = simpleCalculator({ a: 1, b: 2, action: Action.Multiply });

        expect(result).toBe(2);
    });

    test('should divide two numbers', () => {
        const result = simpleCalculator({ a: 1, b: 2, action: Action.Divide });

        expect(result).toBe(0.5);
    });

    test('should exponentiate two numbers', () => {
        const result = simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate });

        expect(result).toBe(1);
    });

    test('should return null for invalid action', () => {
        const result = simpleCalculator({ a: 1, b: 2, action: 'invalid action' });

        expect(result).toBe(null);
    });

    test('should return null for invalid arguments', () => {
        const result = simpleCalculator({ a: 1, b: 'invalid arguments', action: Action.Add });

        expect(result).toBe(null);
    });
});
