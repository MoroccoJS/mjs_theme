<jumbotron>
  <div class="container">
    <h1>A Community of Moroccan Developers<br> who live and breathe <span id="someone"></span></h1>

    <div class="call-to-action">
      <form onsubmit={ addToMailList }>
        <input type="email" name="email" placeholder="Email address...">
        <input type="submit" name="submitEmailButton" value="Stay updated">
      </form>

      <a class="join-link button button-primary" href="/join-moroccojs">Join us</a>
    </div>
  </div>

  <script>
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
  </script>
</jumbotron>
