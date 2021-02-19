module.exports = {
  apps: [
    {
      name: 'poem-nuxt',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'yarn',
      args: 'start',
    },
  ],
}
