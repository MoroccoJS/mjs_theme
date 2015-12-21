
(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(function(require, exports, module) { tagger(require('riot'), require, exports, module)})
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'), require, exports, module)
  } else {
    tagger(window.riot)
  }
})(function(riot, require, exports, module) {
riot.tag2('home', '<jumbotron class="jumbotron"></jumbotron> <social-links class="social-links"></social-links> <div class="posts"> <div class="container"> <h2 class="posts-header">Events, articles, and tutorials from the community</h2> <section each="{tag in mainTags}" class="{tag}" show="{this[tag].length > 0}"> <h3 class="section-header"><span><a href="/tag/{tag}">Recent {tag}</a></span></h3> <div class="row"> <posts-list posts="{this[tag]}"></posts-list> </div> </section> </div> </div>', '', '', function(opts) {
    this.mixin('homeController')

    this.mainTags = ['events', 'articles', 'tutorials']
    this.events = null
    this.articles = null
    this.tutorials = null

    var self = this
    this.on('mount', function() {
      document.title = "MoroccoJS - A Community of Moroccan JavaScript Developers"
      self.fetchPosts('events')
      self.fetchPosts('articles')
      self.fetchPosts('tutorials', true)
    })
}, '{ }');

riot.tag2('jumbotron', '<div class="container"> <h1>A Community of Moroccan Developers<br> who live and breathe <span id="someone"></span></h1> <div class="call-to-action"> <form onsubmit="{addToMailList}"> <input type="email" name="email" placeholder="Email address..."> <input type="submit" name="submitEmailButton" value="Stay updated"> </form> <a class="join-link button button-primary" href="/join-moroccojs">Join us</a> </div> </div>', '', '', function(opts) {
    this.mixin('utilsMixin')
    this.mixin('newsLetterController')

    var self = this
    this.on('mount', function() {
      let theater = self.theaterJS()

      theater
        .on('type:start, erase:start', function () {
          let actor = theater.getCurrentActor()
          actor.$element.classList.add('is-typing')
          actor.$element.classList.remove('is-waiting')
        })
        .on('type:end', function() {
          let actor = theater.getCurrentActor()
          actor.$element.classList.add('is-waiting')
          actor.$element.classList.remove('is-typing')
        })

      theater
        .addActor('someone', { speed: 1, accuracy: 1 })
        .addScene('someone:Technology', 3000)
        .addScene('someone:Node.js', 1000)
        .addScene('someone:Express', 1000)
        .addScene('someone:ReactJS', 1000)
        .addScene('someone:VueJS', 1000)
        .addScene('someone:EmberJS', 1000)
        .addScene('someone:AngularJS', 1000)
        .addScene('someone:RiotJS', 1000)
        .addScene('someone:JavaScript', 2000)
        .addScene(function(done) {
          let actor = theater.getCurrentActor()
          actor.$element.classList.remove('is-typing')
          actor.$element.classList.remove('is-waiting')
        })
    })
}, '{ }');

riot.tag2('navigation', '<ul> <li><a href="/tag/events">Events</a></li> <li><a href="/tag/articles">Articles</a></li> <li><a href="/tag/tutorials">Tutorials</a></li> <li><a href="https://forum.moroccojs.org">Forum</a></li> <li><a href="/host-moroccojs">Host us</a></li> <li><a href="/join-moroccojs">Join us</a></li> </ul>', '', '', function(opts) {
});

riot.tag2('posts-list', '<div each="{opts.posts}" class="post three columns"> <a href="{url}" class="post-image"> <img riot-src="{image}"> </a> <div class="post-info"> <h3 class="title"><a href="{url}">{title}</a></h3> </div> </div>', '', '', function(opts) {
}, '{ }');

riot.tag2('sidebar', '<div class="sidebar-header"> <div class="author-info"> <a class="author-image" href="/author/{opts.author.slug}"><img riot-src="{opts.author.image}"></a> <h3 class="author-name"><a href="/author/{opts.author.slug}">{opts.author.name}</a></h3> <p class="author-bio">{opts.author.bio}</p> </div> </div>', '', '', function(opts) {
}, '{ }');

riot.tag2('social-links', '', '', '', function(opts) {
});

riot.tag2('post', '<div class="mjs-container"> <div class="post-section"> <div class="post-meta"> <h1 class="post-title">{post.title}</h1> </div> <div class="post-content" name="postContent"></div> <div class="post-comments"> <div id="disqus_thread"></div> </div> </div> <sidebar class="sidebar" author="{post.author}"></sidebar> </div>', '', '', function(opts) {
    this.post = null

    this.mixin('postController')

    var self = this
    this.on('mount', function() {
      self.fetchPost(opts.slug)
    })
}, '{ }');
});