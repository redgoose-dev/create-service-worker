import createServiceWorker from '../index.js'

createServiceWorker({
  pathScript: 'src/demo/sw.js',
  pathResource: 'src/demo/resource',
  pathTarget: 'dist/sw.js',
  splitKeyword: '// END OF RESOURCE //',
  ignoreRootFiles: [
    '.DS_Store',
    'robots.txt',
    'sw.js',
  ],
  ignoreSubFiles: [
    '.DS_Store',
  ],
})
