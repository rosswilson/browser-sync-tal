# BrowserSync TAL Plugin

> Plugin that provides client-side scripts for [BrowserSync](http://www.browsersync.io/), supporting the transmission of
> key events to any [TAL](https://github.com/fmtvp/tal) application from a desktop browser.

BrowserSync (with these TAL addons) allows us to launch a TAL application on a number of real devices, and then remote-control those devices via a desktop browser over the network.

## What is TAL?

![TAL](http://fmtvp.github.com/tal/img/tal-logo-bw-small.jpg)

*TAL* was developed internally within the BBC as a way of vastly simplifying TV application development
whilst increasing the reach of BBC TV applications such as *iPlayer*. Today all of the BBC's HTML-based
TV applications are built using *TAL*.

## Use cases

* Live feedback of CSS or JS changes
* Regression testing prior to a release
* Explorative testing, discovering differences between different devices.

\* Support for device-to-device controlling would be interesting too *

## How do I get it setup?

Install [BrowserSync](http://www.browsersync.io/):

`npm install -g browser-sync`

Install the [BrowserSync TAL plugin](https://github.com/rosswilson/browser-sync-tal):

`npm install -g browser-sync-tal`

Create a config file (you could check this into your application codebase):

```
# browser-sync.js
module.exports = {
    "proxy": "www.my.application.com",
    "plugins": [
        "browser-sync-tal"
    ]
};
```

Run BrowserSync:

`browser-sync start --config browser-sync.js`

Point remote devices at `http://YOUR_IP:3000` (e.g. from your TVX page) - this is echoed out in your terminal for convenience. Any keypress received by the application running in your desktop browser will be sent over the network to all connected remote devices.

## Prerequisites

Currently the plugin calls `window.InputApi.keypress(talKeyCode)` which is expected to be globally available on the remote device. This is a small function that receives a talKeyCode (e.g. VK_UP or VK_LEFT) and bubbles a TAL KeyEvent event.

If the application that you're controlling supports TalkShow there's a high chance that you already have this function available. Just enable TalkShow for your application (e.g. with a query param) and BrowserSync should Just Work &trade;.

## Notes

Currently the plugin supports the following keys:

* Up Arrow
* Down Arrow
* Left Arrow
* Right Arrow
* Select (mapped to enter/return on desktop)
* Back (mapped to backspace on desktop)
