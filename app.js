const fs = require ('fs')
const csv = require('fast-csv')
const convert = require('xml-js')
const { resolveMap } = require('./map.js')
const { deceaseMap } = require('./maps/deceaseMap.js')

const inputFileName = 'csv/my.min.csv'
const type = 'Deces'

let xmlParameters = {
    _declaration: {
        _attributes: {
            version: "1.0",
            encoding: "utf-8"
        }
    },
    Contenu: {
        [type]: []
    }
}

/**
 * Read the file stream and pipe it to a csv reader.
 * All rows are read asynchronously.
 */
const stream = fs.createReadStream(inputFileName)
    .pipe(csv({
        delimiter: ';',
        headers: true,
    }))
    .on('data', data => {
        let o = {}

        o = resolveMap(deceaseMap, data)

        xmlParameters.Contenu[type] = [...xmlParameters.Contenu[type], ...[o]]
    })
    .on('end', () => {
        
        let json = JSON.stringify(xmlParameters, null, 2)
        //console.log('done', json)
        fs.writeFile('csv/obj.json', json, e => {
            //console.error (e)
        })

        let xml = convert.json2xml(json, { compact: true, ignoreComment: true, spaces: 4 })
        fs.writeFile('csv/obj.xml', xml, e => {})
    })