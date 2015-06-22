var test = require('tap').test
var rewire = require('rewire')
var palmetto = rewire('../')

test('publish', function (t) {

  var fbMock = {
    endAt: function () {
      return fbMock
    },
    authWithCustomToken: function () {

    },
    limitToLast: function () {
      return fbMock
    },
    on: function (s, fn) {
      t.equals(s, 'child_added', 'listening to child_added')
    },
    push: function (event) {
      //console.log(event)
      t.deepEquals(event, {
        to: 'beep',
        from: 'boop',
        subject: 'widget',
        verb: 'create',
        object: { data: 'goes here'}
      }, 'event is pushed to firebase')
    }
  }

  palmetto.__set__('Firebase', function () {
    return fbMock
  })

  var ee = palmetto({
    endpoint: 'https://rxnorm-services.firebaseio.com/',
    app: 'beep',
    token: 'foo'
  })

  ee.emit('send', {
    to: 'beep',
    from: 'boop',
    subject: 'widget',
    verb: 'create',
    object: { data: 'goes here'}
  })

  t.end()

})
