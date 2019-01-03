const { getNumberOn3Digits, getFirstWord, getSecondWord } = require ('../helpers.js')

exports.birthMap = {
    root: 'Naissance',
    map: [
        {
            header: null,
            newName: 'Act_Statut',
            defaultValue: 3
        }, {
            header: null,
            newName: 'FichierImage',
            resolveField: (data) => {
                return `${data['annee']}N${getNumberOn3Digits(data["num"])}.tif`
            }
        }, {
            header: `num`,
            newName: 'Act_Numero'
        }, {
            header: 'dateacte',
            newName: 'Act_Date'
        }, {
            header: 'date de naissance',
            newName: 'Enf_Nais_Date'
        }, {
            header: 'HeureEvenement',
            newName: 'Enf_Nais_Heure'
        }, {
            header: 'sexe',
            newName: 'Enf_Sexe'
        }, {
            header: 'nom',
            newName: 'Enf_Nom'
        }, {
            header: 'prenom',
            newName: 'Enf_Prenom_1',
            resolveField: (data, { header = null }) => {
            return getFirstWord(data[header])
            }
        }, {
            header: null,
            newName: 'Enf_Prenom_2',
            removeIfEmpty: true,
            resolveField: (data) => {
                return getSecondWord(data["prenom"])
            }
        }, {
            header: 'lieuevenement',
            newName: 'Enf_Nais_Commune'
        }, {
            header: 'nom_pere',
            newName: 'Per_Nom'
        }, {
            header: 'prenom_pere',
            newName: 'Per_Prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data[header])
            }
        }, {
            header: null,
            newName: 'Per_Prenom_2',
            removeIfEmpty: true,
            resolveField: (data) => {
                return getSecondWord(data['prenom_pere'])
            }
        }, {
            header: 'nom_mere',
            newName: 'Mer_Nom'
        }, {
            header: 'prenom_mere',
            newName: 'Mer_Prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data[header])
            }
        }, {
            header: null,
            newName: 'Mer_Prenom_2',
            removeIfEmpty: true,
            resolveField: (data) => {
                return getSecondWord(data['prenom_mere'])
            }
        }
    ]
}