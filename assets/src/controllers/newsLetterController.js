var riot = require('riot');
var request = require('superagent')
var config = require('../mixins/configMixin')

var resetButton = function(el) {
  setTimeout(function () {
    el.disabled = false
    el.classList.remove('error')
    el.classList.remove('success')
    el.value = 'Stay updated'
  }, 2500)
}

var errorButton = function(el, message) {
  el.value = message
  el.classList.add('error')
  el.disabled = true
}

var errorMessages = {
  MEMBER_EXISTS_WITH_EMAIL_ADDRESS: 'Already registered',
  EMAIL_NOT_VALID: 'Invalid email'
}

var newsLetterController = {
  addToMailList: function(e) {
    var self = this

    if (self.email.value == '') {
      errorButton(self.submitEmailButton, 'Type something!')
      resetButton(self.submitEmailButton)
      return
    }

    self.submitEmailButton.value = 'Please wait...'
    self.submitEmailButton.disabled = true
    request
      .post(`${config.api_url}/api/newsletter/subscriptions`)
      .send({ email: this.email.value })
      .end(function(err, res) {
        if (res.body.ok) {
          self.email.value = ''
          self.submitEmailButton.value = 'Thank you!'
          self.submitEmailButton.classList.add('success')
        }
        else {
          errorButton(self.submitEmailButton, errorMessages[res.body.error])
        }
        resetButton(self.submitEmailButton)
      })
  }
}

riot.mixin('newsLetterController', newsLetterController)
