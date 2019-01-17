const fs = require('fs')
const _get = require('lodash/get')

module.exports = (path, sha) => {
    const toWrite = { sha: sha }
    fs.writeFileSync(path, JSON.stringify(toWrite))
}
