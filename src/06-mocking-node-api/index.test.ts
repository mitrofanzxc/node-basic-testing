import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs', () => ({
    existsSync: jest.fn(),
}));
jest.mock('fs/promises', () => ({
    readFile: jest.fn(),
}));
jest.mock('path', () => ({
    join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should set timeout with provided callback and timeout', () => {
        const callback = jest.fn();

        doStuffByTimeout(callback, 1000);

        expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
    });

    test('should call callback only after timeout', () => {
        const callback = jest.fn();

        doStuffByTimeout(callback, 1000);

        jest.advanceTimersByTime(999);

        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1);

        expect(callback).toHaveBeenCalledTimes(1);
    });
});

describe('doStuffByInterval', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should set interval with provided callback and interval', () => {
        const callback = jest.fn();

        doStuffByInterval(callback, 2000);

        expect(setInterval).toHaveBeenCalledWith(callback, 2000);
    });

    test('should call callback multiple times after multiple intervals', () => {
        const callback = jest.fn();

        doStuffByInterval(callback, 2000);

        jest.advanceTimersByTime(6000);

        expect(callback).toHaveBeenCalledTimes(3);
    });
});

describe('readFileAsynchronously', () => {
    const mockPath = 'mock/file/path.txt';

    test('should call join with pathToFile', async () => {
        (join as jest.Mock).mockReturnValue(mockPath);
        (existsSync as jest.Mock).mockReturnValue(false);

        await readFileAsynchronously(mockPath);

        expect(join).toHaveBeenCalledWith(__dirname, mockPath);
    });

    test('should return null if file does not exist', async () => {
        (existsSync as jest.Mock).mockReturnValue(false);

        const result = await readFileAsynchronously(mockPath);

        expect(result).toBeNull();
    });

    test('should return file content if file exists', async () => {
        (existsSync as jest.Mock).mockReturnValue(true);
        (readFile as jest.Mock).mockResolvedValue(Buffer.from('file content'));

        const result = await readFileAsynchronously(mockPath);

        expect(result).toBe('file content');
    });
});
