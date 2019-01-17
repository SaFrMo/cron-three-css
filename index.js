const cron = require('node-cron')
const colors = require('colors')

// local
const getLatestSha = require('./src/getLatestSha')

// main function
const run = async () => {
    console.log('Running CSS3DRenderer cron job...'.bgGreen.black)

    // get the shasum of the latest commit containing a change to the target JS
    const sha = await getLatestSha()

    if (sha === null) {
        // something's wrong - let's alert the user
        console.log('not working')
        return
    }

    console.log(sha)
}

run()
// check for an update once an hour
// cron.schedule('* */1 * * *', () => {})
