import createServiceWorker from '../index.js'

function vitePluginCreateServiceWorker(options)
{
  return {
    name: 'create-service-worker',
    apply: 'build',
    closeBundle()
    {
      console.log('====================', 'closeBundle()')
      createServiceWorker({})
    },
  }
}

export default vitePluginCreateServiceWorker
