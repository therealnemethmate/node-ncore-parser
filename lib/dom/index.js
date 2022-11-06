const { JSDOM } = require('jsdom');

function getDocument(documentHtml) {
    const dom = new JSDOM(documentHtml);
    return dom.window.document;
}

module.exports = {
    getDocument,
};
