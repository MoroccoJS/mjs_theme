<post>
  <div class="mjs-container">
      <div class="post-section">
        <div class="post-meta">
          <h1 class="post-title">{ post.title }</h1>
          <ul class="post-info">
            <li><i class="fa fa-clock-o"></i> { renderDate(post.published_at) }</li>
            <li><i class="fa fa-file-text-o"></i> <a href="/tag/{ post.tags[0].slug }">{ post.tags[0].name }</a></li>
            <li show={ post.tags.length > 1 }><i class="fa fa-tag"></i> <a each={ otherTags(post.tags) } href="/tag/{ slug }">{ name }</a> </li>
            <li class="share-buttons"><div class="addthis_sharing_toolbox"></div></li>
          </ul>
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
