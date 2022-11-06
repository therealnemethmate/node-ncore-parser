/**
 * Clears the ncore query params of the undefined values
 * @param {Object} params 
 * @returns Only the clear, processable params object
 */
function clearParams(params) {
    Object.keys(params).forEach((key) => {
        params[key] === undefined && delete params[key];
    });
    return params;
}

module.exports = { clearParams };
