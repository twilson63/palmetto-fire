# Palmetto Fire

Palmetto Fire is a module that uses firebase as a commit-log system to support microservices, the palmetto module works for both the server and the browser


## Usage

``` js
var pf = require('@twilson63/palmetto-fire')

var ee = pf({
  endpoint: 'https://firebase.io/foobar',
  token: '...',
  subscription: {
    subject: ['*'],
    type: ['response'],
    verb: ['*'],
    session: '...',
    sequence: 'now'
  }
})

// publish event object

ee.emit('patient', 'create', { ... })

// subscribe event object
ee.on('patient', 'create', function(obj) {
  
}, function(err) {
  
})

```

