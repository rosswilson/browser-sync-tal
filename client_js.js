(function (bs) {
  var socket = bs.socket;

  // Map desktop browser key codes to TAL key codes
  var normaliseKeyValue = function(rawKey) {
    return {
      "Up": "VK_UP",
      "ArrowUp": "VK_UP",

      "Down": "VK_DOWN",
      "ArrowDown": "VK_DOWN",

      "Left": "VK_LEFT",
      "ArrowLeft": "VK_LEFT",

      "Right": "VK_RIGHT",
      "ArrowRight": "VK_RIGHT",

      "Enter": "VK_ENTER",

      "U+0008": "VK_BACK"
    }[rawKey];
  };

  // Listen for keyup events and send a TAL keypress event over the socket
  document.body.addEventListener("keyup", function(event) {

    // Different APIs are used across browsers for accessing keypress events
    if (event.key !== undefined) {
      rawKey = event.key;
    } else if (event.keyIdentifier !== undefined) {
      rawKey = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
      rawKey = event.keyCode;
    }

    var normalisedKey = normaliseKeyValue(rawKey);

    if(normalisedKey) {
      socket.emit("tal:keypress", { talKeyCode: normalisedKey });
    } else {
      console.log("Received keypress that isn't configured to be set to the remote device: " + rawKey);
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
