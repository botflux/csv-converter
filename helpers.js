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

/**
 * Adds zeros in front of n if n as less than 3 digits
 * @param {Number} n a number
 */
const getNumberOn3Digits = (n) => {
    if (n / 10 < 1) return `00${n}`
    else if (n / 100 < 1) return `0${n}`
    else return n
}

exports.getFirstWord        = getFirstWord
exports.isNullOrEmpty       = isNullOrEmpty
exports.getNumberOn3Digits  = getNumberOn3Digits