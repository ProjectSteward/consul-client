const register = require('./register')
const watcherFactor = require('./watcher')
const kv = require('./kv')

module.exports = (consulOptions) => {
  const consul = require('consul')(consulOptions)

  const watcher = watcherFactor(consul)
  const keyvalue = kv(consul)
  return {
    registerService: register(consul),
    setKey: keyvalue.setKey,
    getKey: keyvalue.getKey,
    serviceWatcher: watcher.serviceWatcher,
    keyWatcher: watcher.keyWatcher
  }
}