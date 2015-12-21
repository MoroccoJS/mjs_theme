var riot = require('riot');

var configMixin = {
  api_url: 'http://localhost:3000'
}

riot.mixin('configMixin', configMixin)

module.exports = configMixin
