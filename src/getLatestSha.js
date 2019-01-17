const fetch = require('node-fetch')
const _get = require('lodash/get')

module.exports = async () => {
    const url =
        'https://api.github.com/repos/mrdoob/three.js/commits?sha=master&path=examples/js/renderers/CSS3DRenderer.js'

    const json = await fetch(url).then(res => res.json())
    return _get(json, '[0].sha', null)
}
