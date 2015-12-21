var riot = require('riot')
var tags = require('./tags/all')

riot.route('/', function() {
  document.querySelector('#main').style.opacity = 0
  setTimeout(function () {
    riot.mount('#main', 'home')
  }, 300)
})

riot.route('/*',function(slug) {
  document.querySelector('#main').style.opacity = 0
  setTimeout(function () {
    riot.mount('#main', 'post', { slug: slug })
  }, 300)
})


riot.route.base('/')
riot.route.start(true)
