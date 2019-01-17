const fs = require('fs')
const fetch = require('node-fetch')
const colors = require('colors')

module.exports = async (libPath, { user, repo, branch, path }) => {
    try {
        // get the raw code
        const url = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`
        const code = await fetch(url).then(res => res.text())

        // write to built file
        fs.writeFileSync(`${libPath}/index.js`, code)

        // get built JSON
        const builtPackage = fs.readFileSync(`${libPath}/package.json`)
        const packageJson = JSON.parse(builtPackage)

        // increment package version
        const re = /\d+(?=\.\d+$)/
        const oldVersion = parseInt(packageJson.version.match(re)[0])
        if (oldVersion >= 90) {
            console.log('Version at or above 90 - time to increment!')
        }
        const newVersion = oldVersion + 1
        packageJson.version = packageJson.version.replace(re, newVersion)

        // write incremented version to package
        fs.writeFileSync(`${libPath}/package.json`, JSON.stringify(packageJson))
    } catch (err) {
        console.log('Error!'.red)
        console.log(err)
        return 1
    }
}
