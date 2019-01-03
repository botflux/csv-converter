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

const csvToXml = async (fileName, objectMap) => {
    return new Promise ((resolve, reject) => {
        fs.createReadStream(fileName)
            .pipe(csv({
                delimiter: ';',
                headers: true,
            }))
            .on('data', data => {
                let o = resolveMap(objectMap, data)
        
                xmlParameters.Contenu[type] = [...xmlParameters.Contenu[type], ...[o]]
            })
            .on('end', () => {
                let json = JSON.stringify(xmlParameters, null, 2)
        
                let xml = convert.json2xml(json, { compact: true, ignoreComment: true, spaces: 4 })
                resolve(xml)
            })
    })
}

csvToXml(inputFileName, deceaseMap).then (xml => {
    fs.writeFile('csv/obj.xml', xml, _ => {})
})