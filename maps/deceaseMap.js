const { getFirstWord, getNumberOn3Digits } = require ('../helpers.js')

exports.deceaseMap = {
    root: 'Deces',
    map: [
        {
            header: null,
            defaultValue: 3,
            newName: 'Act_Statut',
        },
        {
            header: `numero_acte`,
            newName: 'Act_Numero',
        },
        {
            header: null,
            newName: 'Act_Ordre',
            resolveField: (data, { header = null }, state) => {
                console.log('state', state)
                let i=0
                return data['numero_acte'] + i
            }
        },
        {
            header: 'date_de_deces',
            newName: 'Date_Deces'
        },
        {
            header: 'ville',
            newName: 'Lie_Commune',
        },
        {
            header: 'type',
            newName: 'Act_Transcription',
            resolveField: (data, { header = null }) => {
                return data[header] === 'DE' ? '0' : data[header] === 'TD' ? '1' : ''
            }
        }, {
            header: 'nom',
            newName: 'Def_Nom'
        }, {
            header: 'code_sexe',
            newName: 'Def_Sexe'
        },
        {
            header: 'ville_de_naissance',
            newName: 'Def_Nais_Commune'
        },
        {
            header: 'nom_pere',
            newName: 'Per_Nom'
        }, {
            header: null,
            newName: 'Per_Sexe',
            defaultValue: 1
        }, {
            header: 'nom_mere',
            newName: 'Mer_Nom'
        }, {
            header: null,
            newName: 'FichierImage',
            resolveField: (data, { header = null }) => {
                return `${data['annee']}D${getNumberOn3Digits(Number.parseInt(data["numero_acte"]))}.tif`
            }
        },
        {
            header: null,
            newName: 'Mer_Sexe',
            defaultValue: 2
        }
    ]
}
