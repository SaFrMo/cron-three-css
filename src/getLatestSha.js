const fetch = require('node-fetch')
const _get = require('lodash/get')

module.exports = async ({ user, repo, branch, path }) => {
    const url = `https://api.github.com/repos/${user}/${repo}/commits?sha=${branch}&path=${path}`

    const json = await fetch(url).then(res => res.json())
    return _get(json, '[0].sha', null)
}
