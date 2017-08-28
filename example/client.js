const consulclient = require('../index')({host: 'localhost'})

const serviceName = 'test-service'
const keyName = 'test/key'
consulclient.serviceWatcher(serviceName, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`service ${serviceName} changed: ${JSON.stringify(data)}`)
})

consulclient.keyWatcher(keyName, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`value changed: ${data}`)
})

consulclient.getKey(keyName)
.then(value => console.log(`Value of '${keyName}' is '${value}'`)
, err => console.error(`getKey error: ${err}`));

