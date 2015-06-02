# Palmetto Fire

Palmetto Fire is a module that uses firebase as a commit-log system to support microservices, the palmetto module works for both the server and the browser

[![Build Status](https://travis-ci.org/twilson63/palmetto-fire.svg?branch=master)](https://travis-ci.org/twilson63/palmetto-fire)

## Usage

``` js
var palmetto = require('@twilson63/palmetto-fire')

var ee = palmetto({
  endpoint: 'https://firebase.io/foobar',
  token: '...firebase auth token...'
  app: '...'
})

// publish event object

ee.emit('send', {
  to: 'widget/create',
  from: '...',
  subject: 'widget',
  verb: 'create',
  object: {

  }
})

// subscribe event object
ee.on('widget/create', function(event) {
  // do stuff
  var responseEvent = {
    to: event.from,
    object: {

    }
  }
  ee.emit('send', responseEvent) 
})

```

## Install

``` sh
npm i @twilson63/palmetto-fire
```

## Test

``` sh
npm test
```



