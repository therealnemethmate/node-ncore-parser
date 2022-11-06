const fs = require('fs/promises');
const path = require('path');

const { getIdFromUrl, getDate } = require('../utils');
const { getDocument } = require('../dom');
const {
    getTorrentsHtml,
    downloadTorrentById,
} = require('@node-ncore-parser/fetcher');

async function getTorrents(sessionId, params) {
    const torrentsHtml = await getTorrentsHtml(sessionId, params);
    const document = getDocument(torrentsHtml);
    const key = document.querySelector('link[rel=alternate]').href.split('=')[1];
    const torrentBoxes = [
        ...document.querySelectorAll('.box_torrent'),
        ...document.querySelectorAll('.box_torrent2'),
    ];
    const torrents = torrentBoxes.map((box) => {
        const torrentDiv = box.querySelector('.torrent_txt') || box.querySelector('.torrent_txt2');
        const createdAtBox = box.querySelector('.box_feltoltve') || box.querySelector('.box_feltoltve2');
        const seedBox = box.querySelector('.box_s') || box.querySelector('.box_s2');

        const torrentAnchor = torrentDiv.querySelector('a');
        const peers = Number.parseInt(seedBox.querySelector('a')?.textContent);

        return {
            title: torrentAnchor.title,
            id: getIdFromUrl(torrentAnchor.href),
            createdAt: getDate(createdAtBox.textContent),
            peers,
        };
    });

    return { key, torrents };
}

async function downloadTorrent(sessionId, params, downloadPath) {
    const { blob, filename } = await downloadTorrentById(sessionId, params);
    const fullPath = path.join(downloadPath, filename);
    const buffer = Buffer.from(await blob.arrayBuffer());
    await fs.appendFile(fullPath, buffer);
}

module.exports = { getTorrents, downloadTorrent };
