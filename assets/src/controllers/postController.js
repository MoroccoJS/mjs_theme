var riot = require('riot')
var request = require('superagent')

var loadDisqus = function(url, title, identifier) {

  if (typeof DISQUS == 'undefined') {
    global.disqus_config = function () {
      this.page.url = url
      this.page.title = title
      this.page.identifier = identifier
    }

    var d = document
    var s = d.createElement('script')
    if (window.location.host == 'moroccojs.org') s.src = '//moroccojs.disqus.com/embed.js'
    else s.src = '//moroccojs-dev.disqus.com/embed.js'
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
        document.querySelector('#main').style.opacity = 1
      })
  }
}

riot.mixin('postController', postController)
