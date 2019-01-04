const fs = require ('fs')
const csv = require('fast-csv')
const convert = require('xml-js')
const { resolveMap } = require('./map.js')
const { deceaseMap } = require('./maps/deceaseMap.js')
const { weddingMap } = require('./maps/weddingMap.js')
const { birthMap } = require('./maps/birthMap.js')

const csvToXml = async (fileName, readStreamOption, objectMap) => {
    return new Promise ((resolve, reject) => {
        let { root } = objectMap
        let xmlParameters = {
            _declaration: {
                _attributes: {
                    version: "1.0",
                    encoding: "iso-8859-1"
                }
            },
            Contenu: {
                [root]: []
            }
        }

        fs.createReadStream(fileName, readStreamOption)
            .pipe(csv({
                delimiter: ';',
                headers: true,
            }))
            .on('data', data => {
                let o = resolveMap(objectMap, data)
        
                xmlParameters.Contenu[root] = [...xmlParameters.Contenu[root], ...[o]]
            })
            .on('end', () => {
                let json = JSON.stringify(xmlParameters, null, 2)
        
                let xml = convert.json2xml(json, { compact: true, ignoreComment: true, spaces: 4 })
                resolve(xml)
            })
    })
}

exports.csvToXml =      csvToXml
exports.weddingMap =    weddingMap
exports.birthMap =      birthMap
exports.deceaseMap =    deceaseMap