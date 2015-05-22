# BrowserSync TAL Plugin

Plugin that provides client-side scripts for [BrowserSync](http://www.browsersync.io/), supporting the transimission of key events to any [TAL](https://github.com/fmtvp/tal) application.

## What is TAL?

![TAL](http://fmtvp.github.com/tal/img/tal-logo-bw-small.jpg)

*TAL* was developed internally within the BBC as a way of vastly simplifying TV application development
whilst increasing the reach of BBC TV applications such as *iPlayer*. Today all of the BBC's HTML-based
TV applications are built using *TAL*.

## What does BrowserSync give us?

BrowserSync (with these TAL addons) allows us to launch a TAL application on a number of remote devices, and then remote-control those devices via a desktop browser.

## Use cases

* Live feedback of CSS or JS changes
* Regression testing prior to a release
* Explorative testing, discovering differences between different devices.

\* Support for device-to-device controlling would be interesting too *

## How do I get it setup?

Install [BrowserSync](http://www.browsersync.io/):

`npm install -g browser-sync`

Install the BrowserSync TAL plugin:

`npm install -g https://github.com/rosswilson/browser-sync-tal.git`

Create a config file (you could check this into your application codebase):

```
# browser-sync.js
module.exports = {
    "proxy": "www.my.application.com",
    "plugins": [
        "bs-tal"
    ]
};
```

Run BrowserSync:

`browser-sync start --config browser-sync.js`

Point remote devices at `http://YOUR_IP:3000` (e.g. from your TVX page) - this is echoed out in your terminal for convenience. Any keypresses received by the application running on your computer (Chrome/Firefox) will be sent over the network to all connected remote devices.

## Prerequisites

Currently the plugin calls `InputApi.keypress(talKeyCode)` which is expected to be globally available on the remote device. This is a small function that receives a talKeyCode (e.g. VK_UP or VK_LEFT) and bubbles a TAL KeyEvent event.
