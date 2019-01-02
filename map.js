const { transformDate } = require ('./helpers.js')

/**
 * Returns the value inside the data object relative to the passed header
 * @param {Object} mapField The map field associate
 * @param {Object} data The object you want to map
 */
const getData = ({ header = null, defaultValue = "" }, data) => {
    return data[header] || defaultValue
}

/**
 * Returns a given value inside an object with the given newName associate
 * @param {Object} mapField The map field
 * @param {Object} value 
 */
const objectifyData = ({ defaultValue = "", newName = "Default" }, value) => {
    return { [newName]: value || defaultValue }
}

/**
 * Resolve an element
 * @param {Object} el The map entry
 * @param {Object} data The data that need to be resolve
 */
const resolveElement = (el, data) => {
    const { resolveField = data => data } = el
    return objectifyData(el, resolveField(getData (el, data)))
}

/**
 * Resolve a row with a map
 * @param {Object} mapObject The map matching your data 
 * @param {Object} data Data represents an entry of your collection, for example with CSV data is a row
 */
const resolveMap = ({ map = [] }, data) => {
    return map.reduce((previous, current) => {
        return {...previous, ...resolveElement(current, data) }
    }, {})
}



exports.resolveElement = resolveElement
exports.resolveMap = resolveMap