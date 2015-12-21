<home>
  <jumbotron class="jumbotron"></jumbotron>
  <social-links class="social-links"></social-links>

  <div class="posts">
    <div class="container">
      <h2 class="posts-header">Events, articles, and tutorials from the community</h2>
      <section each={ tag in mainTags } class={ tag } show={ this[tag].length > 0 }>
        <h3 class="section-header"><span><a href="/tag/{ tag }">Recent { tag }</a></span></h3>
        <div class="row">
          <posts-list posts={ this[tag] }></posts-list>
        </div>
      </section>
    </div>
  </div>


  <script>
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
  </script>
</home>
