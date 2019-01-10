const assert = require('assert')
const fs = require('fs')
const { csvToXml } = require('../app.js')
const { deceaseMap } = require('../maps/deceaseMap.js')

describe('map', () => {
    describe('map with state', () => {
        it('should share a state between line resolution', () => {
            csvToXml(`${__dirname}/test.csv`, 'latin1', deceaseMap)
        })
    })
})