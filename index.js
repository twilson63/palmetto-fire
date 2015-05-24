var Firebase = require('firebase')
var EventEmitter = require('events').EventEmitter
var ee = new EventEmitter()

module.exports = function (config) {
  var count = 0
  // validate config
  if (!config.endpoint) throw new Error('endpoint required!') 
  if (!config.app) throw new Error('app required!')

  var ref = new Firebase([config.endpoint, config.app].join('/'))

  var count = 0
  // subscribe
  ref.endAt().limit(1).on('child_added', notify) 

  function notify (shapshot) {
    if (count === 0) return
    count += 1
    var e = snapshot.val()
    if (e.to) ee.emit(e.to, e)
  }
  // publish
  ee.on('send', function (event) {
    ref.push(event)
  })
  // 
  return ee  
}
