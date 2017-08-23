class ServiceWatcher {
  constructor(consul, serviceName, callback) {
    this.watcher = consul.watch({
      method: consul.health.service,
      options: {
        service: serviceName,
        passing: true
      }
    })

    this.watcher.on('change', data => {
      let services = []
      data.forEach((entry) => {
        let address = entry.Service.Address
        let port = entry.Service.Port
        services.push({
          address, port
        })
      })
      callback(null, services)
    })

    this.watcher.on('error', err => {
      callback(err)
    })
  }

  end() {
    this.watcher.end()
  }
}

class KeyWatcher {
  constructor(consul, keyName, callback) {
    this.watcher = consul.watch({
      method: consul.kv.get,
      options: {
        key: keyName
      }
    })

    this.watcher.on('change', function(data) {
      callback(null, data ? data.Value : null)
     })
     
    this.watcher.on('error', function(err) {
      callback(err)
    })
  }

  end() {
    this.watcher.end()
  }
}

const watcherFactory = (consul) => {
  const serviceWatcher = (serviceName, callback) => {
    return new ServiceWatcher(consul, serviceName, callback)
  }

  const keyWatcher = (keyName, callback) => {
    return new KeyWatcher(consul, keyName, callback)
  }

  return {
    serviceWatcher,
    keyWatcher
  }
}

module.exports = watcherFactory