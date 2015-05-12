function Observer() {}

Observer.prototype = {
  on: function (evt, callback) {
    if (!evt && !(typeof callback === 'function')) return
    this._init()
    var events = this._events

    ;(events[evt] || (events[evt] = [])).push(callback)
  },

  trigger: function (evt) {
    if (!evt) return
    this._init()
    var callbacks = this._events[evt] || []
    var len  = callbacks.length
    var args = [].slice.call(arguments, 1)
    for (var i = 0; i < len; ++i) {
      callbacks[i].apply(this, args)
    }      
  },

  _init: function () {
    this._events || (this._events = {})
  }
}

module.exports = Observer