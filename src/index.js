import fs from 'fs'
import path from 'path'
import { getFiles } from './util.js'

const DEFAULT_OPTIONS = {
  pathScript: '',
  pathResource: '',
  pathTarget: '',
  version: 'app-cache',
  splitKeyword: '// END OF RESOURCE //',
  ignoreRootFiles: [],
  ignoreSubFiles: [],
}

/**
 * create service worker
 * @param {Object} _opt
 */
function createServiceWorker(_opt)
{
  const options = Object.assign({}, DEFAULT_OPTIONS, _opt)

  // check options value
  if (!options.pathScript) throw new Error(`no options 'pathScript'`)
  if (!options.pathResource) throw new Error(`no options 'pathResource'`)
  if (!options.pathTarget) throw new Error(`no options 'pathTarget'`)

  // get resource files
  const regExp = new RegExp(`^${path.resolve()}`)
  const pathTarget = options.pathResource.replace(regExp, '')
  let paths = getFiles(
    options.pathResource,
    options.ignoreRootFiles,
    pathTarget,
    function(dirName) {
      return getFiles(
        `${options.pathResource}/${dirName}`,
        options.ignoreSubFiles,
        `${pathTarget}/${dirName}`,
        undefined
      )
    }
  )

  // save sw.js
  let src = ``
  const swText = fs.readFileSync(options.pathScript, 'utf-8')
  const resources = paths.map(o => `'${o}'`).join(',')
  src += `const CACHE_NAME = '${options.version}--${Math.floor(performance.timeOrigin)}'\n`
  src += `const CACHE_RESOURCE = [${resources}]\n`
  src += swText.split(options.splitKeyword)[1]
  fs.writeFileSync(options.pathTarget, src)
}

export default createServiceWorker
