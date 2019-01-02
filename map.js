const { transformDate } = require ('./helpers.js')

exports.deceaseMap = {
    root: 'Deces',
    map: [
        {
            header: null,
            defaultValue: 4,
            newName: 'Act_Statut',
        },
        {
            header: `numero d'acte`,
            newName: 'Act_Numero',
        },
        {
            header: `annee`,
            newName: 'Act_Ordre',
        },
        {
            header: `date de transcription`,
            newName: 'Act_Date',
            resolveField: (data) => {
                return `${data.slice(0, 4)}-${data.slice(4, 6)}-${data.slice(6)}`
            }
        },
        {
            header: `heure`,
            newName: 'Heure_Deces',
        },
        {
            header: 'ville',
            newName: 'Lie_Commune',
        },
    ]
}

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
const resolveMap = ({ root = "root", map = [] }, data) => {
    return map.reduce((previous, current) => {
        return {...previous, ...resolveElement(current, data) }
    }, {})
}



exports.resolveElement = resolveElement
exports.resolveMap = resolveMap