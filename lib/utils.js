function getDate(dateString) {
    try {
        const regexPattern = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
        const match = dateString.match(regexPattern);
        return new Date(match[1], match[2], match[3], match[4], match[5], match[6]);
    } catch (e) {
        //TODO error logging
        return new Date();
    }
}

function getIdFromUrl(url) {
    try {
        return url.match(/[0-9]+$/)[0];
    } catch (e) {
        //TODO error logging
        return null;
    }
}

module.exports = {
    getDate,
    getIdFromUrl,
};
