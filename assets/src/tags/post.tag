<post>
  <div class="mjs-container">
      <div class="post-section">
        <div class="post-meta">
          <h1 class="post-title">{ post.title }</h1>
        </div>
        <div class="post-content" name="postContent"></div>
        <div class="post-comments">
          <div id="disqus_thread"></div>
        </div>
      </div>

      <sidebar class="sidebar" author={ post.author }></sidebar>
  </div>

  <script>
    this.post = null

    this.mixin('postController')

    var self = this
    this.on('mount', function() {
      self.fetchPost(opts.slug)
    })
  </script>
</post>
