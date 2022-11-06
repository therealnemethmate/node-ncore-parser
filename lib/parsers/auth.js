const fetcher = require('@node-ncore-parser/fetcher');

/**
 * Logs in and gets session id, which should be used in further communications
 * @param {{ username: string, password: string}} credentials 
 * @returns `sessionId`
 */
async function login(credentials) {
    if (!credentials) throw new Error('"credentials" is mandatory');
    if (!credentials?.username) {
        throw new Error('"username" is mandatory');
    }
    if (!credentials?.password) {
        throw new Error('"password" is mandatory');
    }
    return fetcher.login(credentials.username, credentials.password);
}

/**
 * Logs out for the given sessionId
 * @param {string} sessionId 
 * @returns `ok` true if login was successful
 */
async function logout(sessionId) {
    if (!sessionId) throw new Error('"sessionId" is mandatory');
    return fetcher.logout(sessionId);
}

module.exports = {
    login,
    logout,
};
