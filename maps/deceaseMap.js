const { getFirstWord, getNumberOn3Digits } = require ('../helpers.js')

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
            newName: 'Act_Date'
        },
        {
            header: 'date de deces',
            newName: 'Date_Deces'
        },
        {
            header: `heure`,
            newName: 'Heure_Deces',
        },
        {
            header: 'ville',
            newName: 'Lie_Commune',
        },
        {
            header: 'type',
            newName: 'Act_Transcription'
        },
        {
            header: 'nom',
            newName: 'Def_Nom'
        },
        {
            header: 'prenom',
            newName: 'Def_Prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data[header])
            }
        },
        {
            header: 'code sexe',
            newName: 'Def_Sexe'
        },
        {
            header: 'ville de naissance',
            newName: 'Def_Nais_Commune'
        },
        {
            header: 'nom père',
            newName: 'Per_Nom'
        },
        {
            header: 'prenom1 père',
            newName: 'Per_Prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data[header])
            }
        },
        {
            header: null,
            newName: 'Per_Sexe',
            defaultValue: 1
        }, 
        {
            header: 'prenom m',
            newName: 'Mer_Prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data[header])
            }
        },
        {
            header: 'nom m',
            newName: 'Mer_Nom'
        },
        {
            header: null,
            newName: 'FichierImage',
            resolveField: (data, { header = null }) => {
                return `${data['annee']}D${getNumberOn3Digits(data["numero d'acte"])}.tif`
            }
        },
        {
            header: null,
            newName: 'Sexe',
            defaultValue: 2
        }
    ]
}
