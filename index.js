function Observer() {
  if (!(this instanceof Observer)) 
    return new Observer
  this._events = {}
}

Observer.prototype = {
  on: function (evt, callback) {
    if (!evt && !(typeof callback === 'function')) return
    var events = this._events
    //console.log(events)

    ;(events[evt] || (events[evt] = [])).push(callback)
  },

  trigger: function (evt) {
    if (!evt) return
    var callbacks = this._events[evt] || []
    var len  = callbacks.length
    var args = [].slice.call(arguments, 1)
    for (var i = 0; i < len; ++i) {
      callbacks[i].apply(this, args)
    }      
  }
}

module.exports = Observer