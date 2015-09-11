var should   = require('should')
var sinon = require('sinon')
var Observer = require('../')


describe('ontrigger class', function () {
    testObserverClass(Observer)
})

describe('derived ontrigger class', function () {
    var DerivedObserver = function () {}
    DerivedObserver.prototype = Object.create(Observer.prototype)

    testObserverClass(DerivedObserver)
})

function testObserverClass (ObserverClass) {
    var observer
    var observerA
    var observerB
    var callback
    var callbackA
    var callbackB

    describe('When observer subscribes one callback into event', function () {
        beforeEach(function () {
            observer = new ObserverClass()
            callback = sinon.spy()
        })
        it('but is not triggered, then callback is not called', function () {
            observer.on('event', callback)
            should(callback.called).be.eql(false)
        })
        it('but another event is triggered, then callback is not called', function () {
            observer.on('event', callback)
            observer.trigger('another-event')
            should(callback.called).be.eql(false)
        })
        it('and before event is triggered, then callback is not called', function () {
            observer.trigger('event')
            observer.on('event', callback)
                            should(callback.called).be.eql(false)
        })
        it('and after event is triggered, then callback is called once', function () {
            observer.on('event', callback)
            observer.trigger('event')
            should(callback.calledOnce).be.eql(true)
        })
    })

    describe('Callback parameters', function () {
        beforeEach(function () {
            observer = new ObserverClass()
            callback = sinon.spy()
        })
        it('If trigger is called with second parameter, callback is called with this parameter as first argument', function () {
            observer.on('event', callback)
            observer.trigger('event', 42)
                            should(callback.calledWith(42)).be.eql(true)
        })
        it('If trigger is called with third parameter, callback is called with this parameter as second argument', function () {
            observer.on('event', callback)
            observer.trigger('event', 42, 2)
                            should(callback.calledWith(42, 2)).be.eql(true)
        })
    })

    describe('When observer subscribes empty event', function () {
        beforeEach(function () {
            observer = new ObserverClass()
            callback = sinon.spy()
        })
        it ('also is triggered', function () {
            observer.on('', callback)
            observer.trigger('')
            should(callback.called).be.eql(true)
        })
    })

    describe('Multiple observers', function () {
        beforeEach(function () {
            observerA = new ObserverClass()
            observerB = new ObserverClass()
            callbackA = sinon.spy()
            callbackB = sinon.spy()
        })
        it('callback is only called if event is triggered by the subscribed observer', function () {
            observerA.on('foo', callbackA)
            observerB.on('foo', callbackB)
            observerA.trigger('foo')
            should(callbackA.calledOnce).be.eql(true)
            should(callbackB.called).be.eql(false)
        })
    })
    
    describe('When observer subscribes 2 callbacks in the same event', function () {
        beforeEach(function () {
            observer = new ObserverClass()
            callbackA = sinon.spy()
            callbackB = sinon.spy()
        })
        it('2 callbacks are called', function () {
            observer.on('foo', callbackA)
            observer.on('foo', callbackB)
            observer.trigger('foo')
            should(callbackA.calledOnce).be.eql(true)
            should(callbackB.calledOnce).be.eql(true)
        })
        it('first subscribed callback is called first', function () {
            observer.on('foo', callbackA)
            observer.on('foo', callbackB)
            observer.trigger('foo')
            should(callbackA.calledBefore(callbackB)).be.eql(true)
        })
    })
}