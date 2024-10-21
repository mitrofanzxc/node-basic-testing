import axios, { Axios } from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = '/posts';
const BASE_URL_DETAILS = '/posts/1';

describe('throttledGetDataFromApi', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should create instance with provided base URL', async () => {
        const axiosCreate = jest.spyOn(axios, 'create');
        const axiosGet = jest.spyOn(Axios.prototype, 'get');

        axiosGet.mockImplementation(async () => ({ data: {} }));

        throttledGetDataFromApi(BASE_URL);

        jest.runAllTimers();

        expect(axiosCreate).toBeCalledWith({
            baseURL: 'https://jsonplaceholder.typicode.com',
        });

        axiosCreate.mockRestore();
        axiosGet.mockRestore();
    });

    test('should perform request to correct provided URL', async () => {
        const axiosGet = jest.spyOn(Axios.prototype, 'get');

        axiosGet.mockImplementation(async () => ({ data: {} }));

        throttledGetDataFromApi(BASE_URL_DETAILS);

        jest.runAllTimers();

        expect(axiosGet).toBeCalledWith(BASE_URL_DETAILS);

        axiosGet.mockRestore();
    });

    test('should return response data', async () => {
        const axiosGet = jest.spyOn(Axios.prototype, 'get');

        axiosGet.mockImplementation(async () => ({
            data: {
                id: 1,
            },
        }));

        expect(throttledGetDataFromApi(BASE_URL_DETAILS)).resolves.toMatchObject({ id: 1 });

        axiosGet.mockRestore();
    });
});
