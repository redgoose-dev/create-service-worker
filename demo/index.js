import fs from 'fs'
import createServiceWorker from '../src/index.js'

const cacheName = 'app-demo'
const splitKeyword = '// END OF RESOURCE //'
const paths = await createServiceWorker({
  target: 'demo/resource',
  output: '',
  ignore: {
    files: [
      '.DS_Store',
      'index.html',
      'sw.js',
    ],
    children: {
      foo: {
        files: [
          'apple.txt',
        ]
      },
    },
  },
})

// save sw.js
let str = ''
const swText = fs.readFileSync('demo/sw.js', 'utf-8')
const resources = paths.map(o => `'${o}'`).join(',')
str += `const CACHE_NAME = '${cacheName}'\n`
str += `const CACHE_RESOURCE = [${resources}]\n`
str += swText.split(splitKeyword)[1]
fs.writeFileSync('dist/sw.js', str)
