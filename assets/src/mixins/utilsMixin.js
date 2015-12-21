var riot = require('riot')
var theaterJS = require('theaterjs')

var utilsMixin = {
  theaterJS: theaterJS
}

riot.mixin('utilsMixin', utilsMixin)
