var riot = require('riot')
var request = require('superagent')
var moment = require('moment')

var loadDisqus = function(url, title, identifier) {

  if (typeof DISQUS == 'undefined') {
    global.disqus_config = function () {
      this.page.url = url
      this.page.title = title
      this.page.identifier = identifier
    }

    var d = document
    var s = d.createElement('script')
    s.src = '//moroccojs.disqus.com/embed.js'
    ;(d.head || d.body).appendChild(s)
  } else {
    DISQUS.reset({
      reload: true,
      config: function () {
        this.page.url = url
        this.page.title = title
        this.page.identifier = identifier
      }
    })
  }
}

var postController = {
  fetchPost: function(slug) {
    var self = this

    request
      .get(ghost.url.api('posts', 'slug', slug, {include: 'tags, author'}))
      .end(function(err, response) {
        self.post = response.body.posts[0]
        document.title = self.post.title
        self.postContent.innerHTML = self.post.html
        hljs.initHighlighting.called = false
        hljs.initHighlighting()
        loadDisqus(`${window.location.origin}/${self.post.slug}`, self.post.title, self.post.slug)
        self.update()
        addthis.layers.refresh()
        document.querySelector('#main').style.opacity = 1
      })
  },

  renderDate: function(date) {
    return moment(date).fromNow()
  },

  otherTags: function(tags) {
    var t = tags.slice(1, tags.length)
    return t
  }
}

riot.mixin('postController', postController)
