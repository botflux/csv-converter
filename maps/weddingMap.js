const { getNumberOn3Digits, getFirstWord, getSecondWord, removeChar } = require ('../helpers.js')

exports.weddingMap = {
    root: 'Mariage',
    map: [
        {
            header: null,
            newName: 'Act_Statut',
            defaultValue: 3
        }, {
            header: null,
            newName: 'FichierImage',
            resolveField: (data, { header = null}) => {
                return `${data['annee']}M${getNumberOn3Digits(data["numero d'acte"])}${(Number.parseInt(data["nombre d'image"]) > 1) ? "001" : "" }.tif`
            }
        }, {
            header: null,
            newName: 'FichierImage2',
            removeIfEmpty: true,
            resolveField: (data, { header = null }) => {
                if (Number.parseInt(data["nombre d'image"]) > 1)
                    return `${data['annee']}M${getNumberOn3Digits(data["numero d'acte"])}${(Number.parseInt(data["nombre d'image"]) > 1) ? "002" : "" }.tif`
                else
                    return null
            }
        }, {
            header: `numero d'acte`,
            newName: 'Act_Numero'
        }, {
            header: null,
            newName: 'Act_Ordre',
            defaultValue: 1
        }, {
            header: 'dateevement',
            newName: 'Act_Date'
        }, {
            header: 'nom',
            newName: 'Epx_Nom'
        }, {
            header: null,
            newName: 'Epx_Prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data['prenom'])
            }
        }, {
            header: null,
            newName: 'Epx_Prenom_2',
            removeIfEmpty: true,
            resolveField: (data, { header = null }) => {
                return getSecondWord(data['prenom'])
            }
        }, {
            header: null,
            newName: 'Epx_Nais_Date',
            resolveField: (data, { header = null }) => {
                return removeChar(data['date_naissance_epoux'], /-/g)
            }
        }, {
            header: null,
            newName: 'Epx_Sexe',
            defaultValue: 1
        }, {
            header: 'lieunaissance_epoux',
            newName: 'Epx_Nais_Commune'
        }, {
            header: null,
            newName: 'Epx_per_prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data['prenom_pere_epoux'])
            }
        }, {
            header: 'nom_pere_epoux',
            newName: 'Epx_per_nom'
        }, {
            header: null,
            newName: 'Epx_Per_Sexe',
            defaultValue: 1
        }, {
            header: 'nom_mere_epoux',
            newName: 'Epx_mer_nom'
        }, {
            header: null,
            newName: 'Epx_mer_prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data['prenom_mere_epoux'])
            }
        }, {
            header: 'nom_epoux',
            newName: 'Eps_Nom'
        }, {
            header: null,
            newName: 'Eps_Prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data['prenom_epoux'])
            }
        }, {
            header: null,
            newName: 'Eps_Prenom_2',
            resolveField: (data, { header = null }) => {
                return getSecondWord(data['prenom_epoux'])
            }
        }, {
            header: null,
            newName: 'Eps_Sexe',
            defaultValue: 2
        }, {
            header: null,
            newName: 'Eps_Nais_Date',
            resolveField: (data, { header = null }) => {
                return removeChar(data['date_naissance_epouse'], /-/g)
            }
        }, {
            header: null,
            newName: 'Contrat',
            defaultValue: '0'
        }, {
            header: null,
            newName: 'Epx_Mer_Sexe',
            defaultValue: "2"
        }, {
            header: null,
            newName: 'Eps_mer_Sexe',
            defaultValue: "2"
        },{
            header: 'nom_pere_epouse',
            newName: 'Eps_per_nom'
        }, {
            header: null,
            newName: 'Eps_per_prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data['nom_pere_epouse'])
            }
        }, {
            header: null,
            newName: 'Eps_per_Sexe',
            defaultValue: "1"
        }, {
            header: 'nom_mere_epouse',
            newName: 'Eps_mer_nom'
        }, {
            header: null,
            newName: 'Eps_mer_prenom_1',
            resolveField: (data, { header = null }) => {
                return getFirstWord(data['prenom_mere_epouse'])
            }
        }, {
            header: 'lieunaissance_epouse',
            newName: 'Eps_Nais_Commune'
        }
    ]
}