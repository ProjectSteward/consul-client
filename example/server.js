const consulclient = require('../index')({host: 'localhost'})

const serviceName = 'test-service'
const keyName = 'test/key'
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

consulclient.registerService(serviceName, 'localhost', getRandomInt(9001, 9100))

setInterval(() => {
  consulclient.setKey(keyName, `${getRandomInt(1, 100000)}`)
  .then(console.log, console.err)
}, 10000)
