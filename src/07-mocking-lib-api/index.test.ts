import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
    const mockResponse = { data: 'test data' };

    beforeEach(() => {
        mockedAxios.create.mockReturnThis();
        mockedAxios.get.mockResolvedValue(mockResponse);
    });

    test('should create instance with provided base URL', async () => {
        await throttledGetDataFromApi('/posts');

        expect(mockedAxios.create).toHaveBeenCalledWith({
            baseURL: 'https://jsonplaceholder.typicode.com',
        });
    });

    test('should perform request to correct provided URL', async () => {
        await throttledGetDataFromApi('/posts/1');

        expect(mockedAxios.get).toHaveBeenCalledWith('/posts/1');
    });

    test('should return response data', async () => {
        const data = await throttledGetDataFromApi('/posts');

        expect(data).toBe(mockResponse.data);
    });
});
