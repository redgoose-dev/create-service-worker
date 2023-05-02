import fs from 'fs'
import createServiceWorker from '../index.js'

/**
 * @param {string} options.pathServiceWorker
 * @param {string} options.pathServiceWorkerTarget
 * @param {string} options.cacheName
 * @param {string} options.splitKeyword
 * @param {object} options.serviceWorker
 * @return {any}
 */
function vitePluginCreateServiceWorker(options)
{
  return {
    name: 'create-service-worker',
    apply: 'build',
    closeBundle()
    {
      createServiceWorker(options.serviceWorker).then(paths => {
        let str = ''
        const swText = fs.readFileSync(options.pathServiceWorker, 'utf-8')
        const resources = paths.map(o => `'${o}'`).join(',')
        str += `const CACHE_NAME = '${options.cacheName}--${Math.floor(performance.timeOrigin)}'\n`
        str += `const CACHE_RESOURCE = [${resources}]\n`
        str += swText.split(options.splitKeyword)[1]
        fs.writeFileSync(options.pathServiceWorkerTarget || '', str)
      })
    },
  }
}

export default vitePluginCreateServiceWorker
