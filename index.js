// npm
const cron = require('node-cron')
const colors = require('colors')

// local
const getLatestSha = require('./src/getLatestSha')
const getOrCreateCache = require('./src/getOrCreateCache')
const updateLocalSha = require('./src/updateLocalSha')
const updateLocalLib = require('./src/updateLocalLib')

// our config
const path = './data/latestThreeSha.json'
const libPath = './built'
const repoInfo = {
    user: 'mrdoob',
    repo: 'three.js',
    branch: 'master',
    path: 'examples/js/renderers/CSS3DRenderer.js'
}

// main function
const run = async () => {
    console.log(`Running update for ${repoInfo.repo}...`.bgGreen.black)

    // get the shasum of the latest commit containing a change to the target JS
    const sha = await getLatestSha(repoInfo)
    if (sha === null) {
        // something's wrong - let's alert the user
        console.log(
            'Something is wrong with fetching the latest commit from Github.'
                .bgRed.black
        )
        return
    }

    // get our latest saved sha
    const latestSha = getOrCreateCache(path)
    if (latestSha === null) {
        console.log('Something is wrong with the latest sha value.'.bgRed.black)
        return
    }

    // if our latest saved sha matches the latest github sha, we're all set
    if (latestSha == sha) {
        console.log('Up to date!'.bgGreen.black)
        // return
    }

    // otherwise, update the local data
    // (returns non-zero value on failure)
    if (await updateLocalLib(libPath, repoInfo)) {
        console.log('Exiting early.'.red)
        return
    }

    // and save the latest sha
    updateLocalSha(path, sha)

    console.log('Updated file!'.bgGreen.black)
}

run()

// schedule cron job
// cron.schedule('* */1 * * *', () => {})
