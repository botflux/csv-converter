/**
 * Returns the first word of a string
 * @param {String} str 
 */
const getFirstWord = (str) => {
    return str.split(" ")[0]
}

/**
 * If the passed variable is null or empty returns true else false
 * @param {*} v Field to test
 */
const isNullOrEmpty = (v) => {
    return (v === undefined || v === null) || (v.toString !== undefined && v.toString().length === 0)
}

exports.getFirstWord        = getFirstWord
exports.isNullOrEmpty       = isNullOrEmpty