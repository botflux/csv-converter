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

    // REFACTORISER POUR QUE L'ON ENVOIE TOUTES LES DONNEES A CHAQUE FOIS

    const { resolveField = getData } = el
    return objectifyData(el, resolveField(data, el))
    //getData (el, data)
}

/**
 * Resolve a row with a map
 * Résout une entrée grâce à une map
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