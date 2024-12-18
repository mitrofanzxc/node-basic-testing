import { simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 2, b: 3, action: Action.Add, expected: 5 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 1, b: 2, action: Action.Subtract, expected: -1 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 1, b: 2, action: Action.Multiply, expected: 2 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
    { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
    { a: 2, b: 2, action: Action.Divide, expected: 1 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 3, b: 2, action: 'invalid action', expected: null },
    { a: 'invalid arguments', b: 2, action: Action.Add, expected: null },
    { a: 2, b: 'invalid arguments', action: Action.Add, expected: null },
    { a: 'invalid arguments', b: 'invalid arguments', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
    test.each(testCases)(
        'should return $expected when $action is applied to $a and $b',
        ({ a, b, action, expected }) => {
            expect(simpleCalculator({ a, b, action })).toBe(expected);
        },
    );
});
