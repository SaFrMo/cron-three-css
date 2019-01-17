const fs = require('fs')
const _get = require('lodash/get')

module.exports = path => {
    // create savefile if it doesn't exist
    if (!fs.existsSync(path)) {
        const toWrite = { sha: '' }
        fs.writeFileSync(path, JSON.stringify(toWrite))
    }

    // get latest sha
    const dataJson = JSON.parse(fs.readFileSync(path, 'utf8'))
    return _get(dataJson, 'sha', null)
}
