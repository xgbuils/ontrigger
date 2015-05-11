var should   = require('should')
var Observer = require('../')

describe('ontrigger', function () {
    it ('empty event string is not triggered', function () {
        var observer = new Observer()

        var x
        observer.on('', function () {
            x = 'bar'
        })

        observer.trigger('')

        should(x).be.eql(undefined)
    })

    it ('if callback is not a function, event is not listened', function () {
        var observer = new Observer()

        observer.on('foo')

        observer.trigger('')
    })

    it ('trigger before on', function () {
        var observer = new Observer()

        var x
        observer.trigger('foo')
        
        observer.on('foo', function () {
            x = 'bar'
        })

        should(x).be.eql(undefined)
    })

    it ('trigger `foo` after on', function () {
        var observer = new Observer()

        var x
        observer.on('foo', function () {
            x = 'bar'
        })

        observer.trigger('foo')

        should(x).be.eql('bar')
    })

    it ('multiple observers', function () {
        var a = Observer()
        var b = Observer()

        var x, y
        a.on('foo', function () {
            x = 'bar'
        })

        b.on('fizz', function () {
            x = 'buzz'
        })

        a.trigger('foo')

        x.should.be.eql('bar')
    })

    it ('multiple callbacks', function () {
        var a = Observer()

        var x = ''
        a.on('foo', function () {
            x += 'fizz'
        })

        a.on('foo', function () {
            x += 'buzz'
        })

        a.trigger('foo')

        x.should.be.eql('fizzbuzz')
    })
})