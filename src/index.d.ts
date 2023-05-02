declare module '@redgoose/create-service-worker' {

  interface CreateServiceWorkerParams {
    target: string
    output: string
    ignore: object
  }

  function createServiceWorker(opt: CreateServiceWorkerParams): Promise<string[]>

  export default createServiceWorker

}
