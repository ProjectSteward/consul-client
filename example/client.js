const consulclient = require('../index')({host: 'localhost'})

const serviceName = 'test-service'
const keyName = 'test/key'
consulclient.serviceWatcher(serviceName, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`service changed: ${JSON.stringify(data)}`)
})

consulclient.keyWatcher(keyName, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`value changed: ${data}`)
})

