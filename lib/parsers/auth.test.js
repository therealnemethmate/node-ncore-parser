jest.mock('../../packages/fetcher', () => ({ login: jest.fn(), logout: jest.fn() }));
const fetcher = require('@node-ncore-parser/fetcher');
const { login, logout } = require('./auth');

describe('auth', () => {
    describe('login', () => {
        test('should throw missing credentials error', () => {
            expect(login()).rejects.toThrow(/"credentials" is mandatory/);
            expect(login(null)).rejects.toThrow(/"credentials" is mandatory/);
        });

        test('should throw missing username error', () => {
            expect(login({ password: 'pw' })).rejects.toThrow(/"username" is mandatory/);
        });

        test('should throw missing password error', () => {
            expect(login({ username: 'foo' })).rejects.toThrow(/"password" is mandatory/);
        });

        test('should call fetcher login', async () => {
            await login({ username: 'asd', password: 'fgh' });
            expect(fetcher.login).toHaveBeenCalledWith('asd', 'fgh');    
        });
    });
    describe('logout', () => {
        test('should throw missing sessionId error', () => {
            expect(logout()).rejects.toThrow(/"sessionId" is mandatory/);    
        });

        test('should call fetcher login', () => {
            logout('faf');
            expect(fetcher.logout).toHaveBeenCalledWith('faf');    
        });
    });
});
