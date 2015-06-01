var test = require('tap').test
var rewire = require('rewire')
var palmetto = rewire('../')

test('subscribe', function (t) {

  var fbMock = {
    endAt: function () {
      return fbMock
    },
    limit: function () {
      return fbMock
    },
    on: function (s, fn) {
      t.equals(s, 'child_added', 'looking up child_added')
      // should skip first event...
      setTimeout(function() {
        fn({
          val: function () {
            return { foo: 'bar'}
          }
        })
      }, 50)
      // should handle second
      setTimeout(function() {
        fn({
          val: function () {
            return { to: 'beepboop' }
          }
        })
      }, 100)
    },
    push: function (event) {
      
    }
  }

  palmetto.__set__('Firebase', function () {
    return fbMock
  })

  var ee = palmetto({
    endpoint: 'https://tinylog.firebaseio.com/',
    app: 'tinylog'
  })

  ee.on('beepboop', function (event) {
    t.deepEquals(event, { to: 'beepboop' }, 'received notification of event')
    t.end()
  })
})
