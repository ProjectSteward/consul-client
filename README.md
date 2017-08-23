# Consul client
A wrapper of node-consul for common usecase
- Watch avaliable service address
- Watch key pair value for changes
- Set key-pair value to consul

## Usage
```
const consulOptions = {host: 'localhost'}
const consulclient = require('consulclient')(consulOptions)
```

## Example
1. Start a client instance
```
node ./example/client
```

2. Start a server instance (can be run simultaneously)
```
node ./example/server
```