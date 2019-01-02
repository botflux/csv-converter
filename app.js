const fs = require ('fs')
const csv = require('fast-csv')
const { deceaseMap, resolveMap } = require('./map.js')
const inputFileName = 'csv/my.csv'

let array = []

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

        array = [...array, ...[o]]
    })
    .on('end', () => {
        //console.log('done')
        let json = JSON.stringify(array, null, 2)
        console.log('done', json)
        fs.writeFile('csv/obj.json', json, e => {
            console.error (e)
        })
    })
