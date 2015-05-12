# ontrigger

light observer/eventemitter with only on and trigger methods

![Travis CI](https://travis-ci.org/xgbuils/ontrigger.svg?branch=master)

## Why? 
There are a lot of cases that only is used trigger and on methods of observer. This module only supply these methods.

## Example:
``` javascript
var a = new Observer()

var x = ''

a.on('foo', function () {
    x += 'fizz'
})

a.on('foo', function () {
    x += 'buzz'
})

a.trigger('foo')

console.log(x) // fizzbuzz
```

## Doc
See [tests](https://github.com/xgbuils/ontrigger/tree/master/test)