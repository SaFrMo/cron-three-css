// npm
const cron = require('node-cron')
const colors = require('colors')

// local
const getLatestSha = require('./src/getLatestSha')
const getOrCreateCache = require('./src/getOrCreateCache')
const updateLocalSha = require('./src/updateLocalSha')

const path = './data/latestThreeSha.json'

// main function
const run = async () => {
    console.log('Running CSS3DRenderer cron job...'.bgGreen.black)

    // get the shasum of the latest commit containing a change to the target JS
    const sha = await getLatestSha()
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
        console.log('Up to date!'.green)
        return
    }

    // otherwise, save the latest sha
    updateLocalSha(path, sha)
}

run()

// schedule cron job
// cron.schedule('* */1 * * *', () => {})
