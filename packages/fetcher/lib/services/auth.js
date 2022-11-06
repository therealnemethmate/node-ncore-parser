const fetch = require( 'node-fetch');
const { headers } = require( '../common.js');
const { baseUrl } = require( '../env.js');

async function getSessionId() {
    const res = await fetch(`${baseUrl}/`, {
        redirect: 'manual',
        method: 'GET',
        headers,
    });

    try {
        return res.headers.get('set-cookie').match(/=(.*?);/)[1];
    } catch (error) {
        throw new Error(`Failed to get session id! ${res.statusText}`);
    }
}

async function login(username, password) {
    const phpSessionId = await getSessionId();
    const res = await fetch(`${baseUrl}/login.php`, {
        method: 'POST',
        headers: {
            ...headers,
            Cookie: `PHPSESSID=${phpSessionId}`,
        },
        body: new URLSearchParams({
            set_lang: 'hu',
            submitted: '1',
            nev: username,
            pass: password,
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to log in with sessionId ${phpSessionId}! ${res.statusText}`);
    }
    return phpSessionId;
}

async function logout(sessionId) {
    const res = await fetch(`${baseUrl}/exit.php?q=${sessionId}`, {
        method: 'POST',
        headers: {
            ...headers,
            Cookie: `PHPSESSID=${sessionId}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Unable to log out with sessionId ${sessionId}! ${res.statusText}`);
    }
    return res.ok;
}

module.exports = { login, logout };
