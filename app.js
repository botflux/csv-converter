const fs = require ('fs')
const csv = require('fast-csv')
const inputFileName = 'csv/my.csv'

const transformDate = (date) => {
    if (date.length !== 8) {
        return "";
    }

    return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`
}

const deceaseMap = {
    root: 'Contenu',
    rootEntity: 'Deces',
    map: [
        {
            header: null,
            default: 4,
            newName: 'Act_Statut'
        },
        {
            header: `numero d'acte`,
            newName: 'Act_Numero'
        },
        {
            header: `annee`,
            newName: 'Act_Ordre'
        },
        {
            header: `date de transcription`,
            newName: 'Act_Date',
            transform: transformDate
        },
        {
            header: `heure`,
            newName: 'Heure_Deces'
        },
        {
            header: 'ville',
            newName: 'Lie_Commune'
        }
    ]
}

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

        deceaseMap.map.forEach(el => {
            let matching = data[el.header] || null

            if (el.header === undefined || el.header === null) {
                o = { ...o, ...{[el.newName]: el.default}}
            }

            if (matching !== null) {
                let temp = { [el.newName]: (el.transform !== undefined && el.transform !== null) ? el.transform(matching) : matching }
                o = {...o, ...temp }
            } 
        })

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
