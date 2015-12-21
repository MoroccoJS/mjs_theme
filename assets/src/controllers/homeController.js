var riot = require('riot');
var request = require('superagent')

var homeController = {
  fetchPosts: function(tag, last) {
    var self = this

    request
      .get(ghost.url.api('posts', { limit: 8, filter: `tags:${tag}` }))
      .end(function(err, response) {
        self[tag] = response.body.posts
        if (last) {
          self.update()
          document.querySelector('#main').style.opacity = 1
        }
      })
  }
}

riot.mixin('homeController', homeController)
