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

    if(talKeyCode) {
      console.log("Triggering a " + talKeyCode + " TAL keypress event");

      if(InputApi.keypress) {
        InputApi.keypress(talKeyCode);
      } else {
        console.error("InputApi.keypress function doesn't exist, cannot send keypress to TAL application!");
      }
    };

  });

})(___browserSync___);
