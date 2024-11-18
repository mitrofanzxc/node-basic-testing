import { generateLinkedList } from './index';

const VALUES_1 = [1, 2, 3];
const VALUES_2 = ['a', 'b', 'c'];

describe('generateLinkedList', () => {
    test('should generate linked list from values 1', () => {
        const expectedList = {
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 3,
                    next: {
                        value: null,
                        next: null,
                    },
                },
            },
        };

        expect(generateLinkedList(VALUES_1)).toStrictEqual(expectedList);
    });

    test('should generate linked list from values 2', () => {
        expect(generateLinkedList(VALUES_2)).toMatchSnapshot();
    });
});
