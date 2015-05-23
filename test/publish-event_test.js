var test = require('tap').test
var pf = require('../')

test('publish', function (t) {
  pf({
    endpoint: 'https://tinylog.firebaseio.com/'
  }, function (err, ee) {
    ee.emit('foo', 'bar', { meta: { foo: 'bar' }})
    t.end()
  })
})
