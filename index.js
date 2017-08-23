const register = require('./register')
const watcherFactor = require('./watcher')
const setKey = require('./setKey')

module.exports = (consulOptions) => {
  const consul = require('consul')(consulOptions)

  const watcher = watcherFactor(consul)
  return {
    register: register(consul),
    setKey: setKey(consul),
    serviceWatcher: watcher.serviceWatcher,
    keyWatcher: watcher.keyWatcher
  }
}