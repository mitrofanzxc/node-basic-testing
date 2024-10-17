import {
    getBankAccount,
    InsufficientFundsError,
    SynchronizationFailedError,
    TransferFailedError,
} from '.';

describe('BankAccount', () => {
    test('should create account with initial balance', () => {
        const account = getBankAccount(100);

        expect(account.getBalance()).toBe(100);
    });

    test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
        const account = getBankAccount(50);

        expect(() => account.withdraw(60)).toThrow(InsufficientFundsError);
    });

    test('should throw error when transferring more than balance', () => {
        const account1 = getBankAccount(50);
        const account2 = getBankAccount(100);

        expect(() => account1.transfer(60, account2)).toThrow(InsufficientFundsError);
    });

    test('should throw error when transferring to the same account', () => {
        const account = getBankAccount(100);

        expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
    });

    test('should deposit money', () => {
        const account = getBankAccount(100);

        account.deposit(50);

        expect(account.getBalance()).toBe(150);
    });

    test('should withdraw money', () => {
        const account = getBankAccount(100);

        account.withdraw(50);

        expect(account.getBalance()).toBe(50);
    });

    test('should transfer money', () => {
        const account1 = getBankAccount(100);
        const account2 = getBankAccount(50);

        account1.transfer(50, account2);

        expect(account1.getBalance()).toBe(50);
        expect(account2.getBalance()).toBe(100);
    });

    test('fetchBalance should return number in case if request did not failed', async () => {
        const account = getBankAccount(100);
        const balance = await account.fetchBalance();

        if (balance !== null) {
            expect(typeof balance).toBe('number');
        }
    });

    test('should set new balance if fetchBalance returned number', async () => {
        const account = getBankAccount(100);

        await account.synchronizeBalance();

        const newBalance = account.getBalance();

        expect(typeof newBalance).toBe('number');
    });

    test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
        const account = getBankAccount(100);

        jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

        await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
    });
});
