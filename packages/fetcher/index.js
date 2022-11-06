const auth = require('./lib/services/auth.js');
const torrent = require('./lib/services/torrent.js');

module.exports = {
    ...auth,
    ...torrent,
};
