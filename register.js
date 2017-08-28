const ttlInterval = 10; // 10 sec

const register = (consul) => (name, address, port) => new Promise((resolve, reject) => {
  const id = require('uuid/v4')()
  const check = {
    ttl: ttlInterval + 's',
    deregister_critical_service_after: '1m'
  }

  const options = {name, address, port, id, check}
  let timerInstance = 0;

  consul.agent.service.register(options, err => {
    if (err) {
      reject(err)
    }

    timerInstance = setInterval(() => {
      consul.agent.check.pass({id: `service:${id}`}, err => {
        if (err) {
          console.error(`ping console failed: ${err}`)
        }
      })
    }, ttlInterval / 2 * 1000)

    resolve({
      stop: () => {
        if (timerInstance != 0) {
          clearInterval(timerInstance)
        }
      }
    });
  })
})

module.exports = register