const { isNullOrEmpty } = require('./helpers.js')

/**
 * Returns the value inside the data object relative to the passed header
 * @param {Object} data The object you want to map
 * @param {Object} mapField The map field associate
 */
const getData = (data, { header = null, defaultValue = "" }) => {
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
 * Résout un élément d'une map
 * @param {Object} el The map entry
 * @param {Object} data The data that need to be resolve
 */
const resolveElement = (el, data) => {
    console.log('state before', state)
    const { resolveField = getData, removeIfEmpty = false } = el
    let resolved = resolveField(data, el, state)
    
    if (removeIfEmpty && isNullOrEmpty(resolved)) {
        return {}
    }
    
    return objectifyData(el, resolved)
}

/**
 * Resolve a row with a map
 * Résout une entrée grâce à une map
 * @param {Object} mapObject The map matching your data 
 * @param {Object} data Data represents an entry of your collection, for example with CSV data is a row
 */
const resolveMap = (objectMap, data) => {
    let keys = Object.keys(data)
    const { map } = objectMap

    // forEach key, we search for a map matching with this key
    // if there is a map matching this key then we resolve the data and return it
    let reduced = keys.reduce((previous, current) => {
        let matchingMap = map.find(mapElement => {
            return mapElement.header === current
        })
        if (matchingMap !== undefined && matchingMap !== null) {
            console.log('root', state)
            return {...previous, ...resolveElement(matchingMap, data)}
        }

        return previous
    }, {})

    // We filter all the mapElement without header (default value field hasn't header)
    let headerlessMapElement = map.filter((mapElement) => mapElement.header === null)
    // forEach element without header we resolve data and return it
    let headerless = headerlessMapElement.reduce((previous, current) => {
        return {...previous, ...resolveElement(current, data)}
    }, {})

    // we return the concatenation of the data reduced with a header and without a header 
    return {...reduced, ...headerless}
}

exports.resolveElement = resolveElement
exports.resolveMap = resolveMap