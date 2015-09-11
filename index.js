function Observer() {}

Observer.prototype = {
  on: function (evt, callback) {
    if (typeof evt === 'string') {
      init.call(this)
      var events = this._events
      ;(events[evt] || (events[evt] = [])).push(callback)
    }
  },

  trigger: function (evt) {
    if (typeof evt === 'string') {
      init.call(this)
      var callbacks = this._events[evt] || []
      var len  = callbacks.length
      var args = [].slice.call(arguments, 1)
      for (var i = 0; i < len; ++i) {
        callbacks[i].apply(this, args)
      }
    }
  }
}

function init() {
  this._events || (this._events = {})
}

module.exports = Observer