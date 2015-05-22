var path = require("path");

var PLUGIN_NAME = "TAL Remote Control",
    EVENT_NAME = "tal:keypress"

module.exports = {
  "plugin:name": PLUGIN_NAME,

  plugin: function() {},

  hooks: {
      "client:events": function() {
          return EVENT_NAME;
      },
      "client:js": require("fs").readFileSync(path.resolve(__dirname, 'client_js.js'))
  }
};
