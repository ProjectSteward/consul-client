const kv = (consul) => {
  const setKey = (key, value) => new Promise((resolve, reject) => {
    consul.kv.set(key, value, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })

  const getKey = (key) => new Promise((resolve, reject) => {
    consul.kv.get(key, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result ? result.Value : null)
      }
    })
  })

  return {
    setKey,
    getKey
  }
}

module.exports = kv