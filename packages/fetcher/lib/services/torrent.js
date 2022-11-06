const fetch = require( 'node-fetch');
const { headers } = require( '../common.js');
const { baseUrl } = require( '../env.js');
const { clearParams } = require( '../utils.js');

async function getTorrentsHtml(sessionId, params = {}) {
    if (!sessionId) {
        throw new Error('Session id is required!');
    }

    const { sortBy, order, type, types, page, searchText } = params;
    const ncoreQueryParams = {
        oldal: page,
        miszerint: sortBy,
        hogyan: order,
        tipus: type,
        kivalasztottak_kozott: types?.join(', '),
        mire: searchText,
        miben: 'name',
    };

    const queryParams = `?${new URLSearchParams(clearParams(ncoreQueryParams))}`;
    const url = `${baseUrl}/torrents.php${queryParams}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            ...headers,
            Cookie: `PHPSESSID=${sessionId}`,
        },
    });
    return res.text();
}

async function downloadTorrentById(sessionId, params) {
    const { torrentId, key } = params;
    if (!torrentId) throw new Error('Missing "torrentId"');
    if (!key) throw new Error('Missing "key" for download');

    const queryParams = new URLSearchParams({ id: torrentId, key });
    const url = `${baseUrl}/torrents.php?action=download&${queryParams}`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            ...headers,
            Cookie: `PHPSESSID=${sessionId}`,
        },
    });
    const filename = res.headers.get('content-disposition')?.match(/"(.*?)"/)[1];
    const blob = await res.blob();
    return { blob, filename };
}

module.exports = {
    getTorrentsHtml,
    downloadTorrentById,
};
