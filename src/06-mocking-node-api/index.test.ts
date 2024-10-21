import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

const DEFAULT_TIMEOUT = 1000;

describe('doStuffByTimeout', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should set timeout with provided callback and timeout', () => {
        const callback = jest.fn();
        const setTimeout = jest.spyOn(global, 'setTimeout');

        doStuffByTimeout(callback, DEFAULT_TIMEOUT);

        expect(setTimeout).toHaveBeenCalledWith(callback, DEFAULT_TIMEOUT);

        setTimeout.mockRestore();
    });

    test('should call callback only after timeout', () => {
        const callback = jest.fn();

        doStuffByTimeout(callback, DEFAULT_TIMEOUT);

        jest.advanceTimersByTime(DEFAULT_TIMEOUT - 1);

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
        const setInterval = jest.spyOn(global, 'setInterval');

        doStuffByInterval(callback, DEFAULT_TIMEOUT);

        expect(setInterval).toHaveBeenCalledWith(callback, DEFAULT_TIMEOUT);

        setInterval.mockRestore();
    });

    test('should call callback multiple times after multiple intervals', () => {
        const times = 3;
        const callback = jest.fn();

        doStuffByInterval(callback, DEFAULT_TIMEOUT);

        jest.advanceTimersByTime(DEFAULT_TIMEOUT * times);

        expect(callback).toHaveBeenCalledTimes(times);
    });
});

describe('readFileAsynchronously', () => {
    const pathToFile = 'mock/file/path.txt';

    test('should call join with pathToFile', async () => {
        const join = jest.spyOn(path, 'join');

        readFileAsynchronously(pathToFile).then(() => {
            expect(join).toHaveBeenCalledWith(expect.anything(), pathToFile);

            join.mockRestore();
        });
    });

    test('should return null if file does not exist', async () => {
        const existsSync = jest.spyOn(fs, 'existsSync');

        existsSync.mockReturnValueOnce(false);

        const result = await readFileAsynchronously(pathToFile);

        expect(result).toBeNull();

        existsSync.mockRestore();
    });

    test('should return file content if file exists', async () => {
        const existsSync = jest.spyOn(fs, 'existsSync');
        const readFile = jest.spyOn(fsPromises, 'readFile');
        const resultReadFile = Buffer.from('result');

        existsSync.mockReturnValueOnce(true);
        readFile.mockReturnValueOnce(new Promise((_) => _(resultReadFile)));

        const result = await readFileAsynchronously(pathToFile);

        expect(result).toEqual(resultReadFile.toString());

        existsSync.mockRestore();
        readFile.mockRestore();
    });
});
