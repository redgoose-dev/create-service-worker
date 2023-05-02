import { getFiles } from './util.js'

const DEFAULT_OPTIONS = {
  target: '',
  output: '',
  ignore: {},
}

/**
 * create service worker
 * @param {string} _opt.target
 * @param {string} _opt.output
 * @param {object} _opt.ignore
 * @return {Promise<string[]>}
 */
async function createServiceWorker(_opt)
{
  const options = Object.assign({}, DEFAULT_OPTIONS, _opt)

  // check options value
  if (!options.target) throw new Error(`no options 'pathScript'`)

  // get resource files
  return getFiles(
    options.target,
    options.output,
    options.ignore
  )
}

export default createServiceWorker
