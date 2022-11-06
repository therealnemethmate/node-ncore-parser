# node-ncore-parser

## Introduction
!! Currenty in beta mode !!

This module provides Node.js functions to list and download torrents from ncore.pro

## Usage
```js
const { login, getTorrents, downloadTorrent } = require('node-ncore-parser');

// Get "sessionId", which is required to further communications.
const sessionId = await login({ username: 'username', password: 'password' });

// Lists newest 25 torrents without filtering and get "key" to download torrents.
await getTorrents(sessionId);

// Lists filtered torrents (maximum 25)
const { key, torrents } = await getTorrents(sessionId, {
    sortBy: 'seeders', //sorts by seeders
    order: 'DESC', //desc
    type: 'game_iso', //types are not checked yet, you should check how to use them at ncore.pro
    page: 1, //for pagination
    searchText: 'gta', //searches for gta
});

await downloadTorrent(sessionId, { key, torrentId: torrents[0].id }, '/home/me/downloads' );
```
