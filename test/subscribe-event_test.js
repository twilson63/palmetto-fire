var test = require('tap').test
var pf = require('../')

test('subscribe', function (t) {
  pf({
    endpoint: 'https://tinylog.firebaseio.com/',
    subscription: {
      subject: ['foo'],
      type: ['*dcc'],
      verb: ['*']
    }
  }, function (err, ee) {
    ee.on('foo', 'bar', function (data) {
      console.log('ping')
      console.log(data)
      t.end()
    })

    setTimeout(function() {
      console.log('tick')
      ee.emit('foo', 'bar', { meta: { foo: 'bar' }})
    }, 1000)
    
  })
})
