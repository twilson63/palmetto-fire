var Firebase = require('firebase')
var events = require('events')
var EventEmitter = events.EventEmitter
var ee = new EventEmitter()

module.exports = function (config) {
  // validate config
  if (!config.endpoint) throw new Error('endpoint required!')
  if (!config.app) throw new Error('app required!')
  if (!config.token) throw new Error('token or secret required!')

  var ref = new Firebase([config.endpoint, config.app].join('/'))

  var count = 0

  // subscribe
  ref.authWithCustomToken(config.token, function (err, result) {
    if (err) { throw err }
    ref.endAt().limitToLast(1).on('child_added', notify)
  })

  function notify (snapshot) {
    count += 1
    if (count === 1) return

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
