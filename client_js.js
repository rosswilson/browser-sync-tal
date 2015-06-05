(function (bs) {
  var socket = bs.socket;

  // Listen for keyup events and send a TAL keypress event over the socket
  document.body.addEventListener("keyup", function(event) {
    var keyCode = event.keyCode;

    if(antie === undefined) {
        console.error("window.antie is not defined, are you running browser-sync-tal with a non-TAL application?")
        return false;
    }

    var antieKeyname = antie.framework.deviceConfiguration.input.map[keyCode];

    if(antieKeyname) {
      socket.emit("tal:keypress", { talKeyCode: "VK_" + antieKeyname });
    } else {
      console.log("Received keypress that isn't mapped in TAL device config: " + keyCode);
    }

  });

  // Receive a keypress event over the socket and pass it onto the app
  socket.on("tal:keypress", function (data) {
    var talKeyCode = data.talKeyCode;

    function emitTalKeyPress(keyName) {
      var Application = require('antie/application');
      var KeyEvent = require('antie/events/keyevent');
      var application = Application.getCurrentApplication();
      application.bubbleEvent(new KeyEvent("keydown", KeyEvent[keyName]));
      application.bubbleEvent(new KeyEvent("keyup", KeyEvent[keyName]));
    }

    if(talKeyCode) {
      console.log("Triggering a " + talKeyCode + " TAL keypress event");
      emitTalKeyPress(talKeyCode);
    };

  });

})(___browserSync___);
