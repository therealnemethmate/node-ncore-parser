const auth = require('./lib/parsers/auth.js');
const torrent = require('./lib/parsers/torrent.js');

module.exports = {
    ...auth,
    ...torrent,
};
