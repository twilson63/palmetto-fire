var Firebase = require('firebase')
var EventEmitter = require('events').EventEmitter
var ee = new EventEmitter()
var R = require('ramda')

/**
config:

  - endpoint (url to firebase application)
  - token (temporary jwt token generated by authentication)
  - subscription: 
    - subject ( required array - ['*'])
    - verb (required array - ['create', 'query', 'update', 'remove'] or ['*'])
    - type (required array - ['request', 'response', 'snapshot'] or ['*'])
    - sequence (default: now) // not implemented....
    - session (optional)

**/

module.exports = function (config, callback) {

  // TODO: Validate Config
  var ref = new Firebase(config.endpoint);


  // ref.authWithCustomToken(config.token, function(e) {
  //   if (e) return console.log(e)
     callback(null, Object.freeze({
       emit: emit,
       on: on
     }))
  // })
  if (config.subscription && config.subscription.subject) {
    config.subscription.subject.forEach(function(s) {
      ref.child(s).on('child_added', notify)
    })  
  }
  

  function notify (snapshot) {
    var data = snapshot.val()
    //console.log(data)
    R.pipe(
      has('verb', config.subscription.verb),
      has('type', config.subscription.type),
      send(ee)
    )(data)
  }

  function emit (subject, verb, type, object) {
    // TODO: post to firebase
    ref.child(subject).push({
      subject: subject,
      verb: verb,
      type: type,
      object: object,
      session: config.session || null
    })
  }

  function on (subject, verb, type, fn) {
    // TODO: listen to changes 
    ee.on([subject, verb, type].join('/'), fn)
  }
  
}

// curry
var has = R.curry(function (name, items, data) {
  if (null) return null
  if (items[0] === '*') return data
  if (items.indexOf(data[name]) > - 1) return data
  return null
})

// curry
var send = R.curry(function (ee, data) {
  if (data)
    ee.emit([data.subject, data.verb, data.type].join('/'), data)
})
