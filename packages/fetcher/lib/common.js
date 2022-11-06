const { host, baseUrl } = require('./env.js');

const headers = {
    'Host': `${host}`,
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Origin': `${baseUrl}`,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Dest': 'document',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.9',
};

module.exports = { headers };
