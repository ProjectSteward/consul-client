const setKey = (consul) => (key, value) => {
  consul.kv.set(key, value, (err, result) => {
    if (err) {
      console.error(err)
      return
    }
  })
}

module.exports = setKey