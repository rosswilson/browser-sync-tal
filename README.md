# BrowserSync TAL Plugin

> Plugin that provides client-side scripts for [BrowserSync](http://www.browsersync.io/), supporting the broadcast of
> keypresses to any number of [TAL](https://github.com/fmtvp/tal) applications.

BrowserSync (with this TAL plugin) allows us to launch a TAL application on an unlimited number of real devices, and then control all those devices in synchronisation with a single remote control. Each device will receive your keypress event - allowing mass testing across devices.

## What is TAL?

![TAL](http://fmtvp.github.com/tal/img/tal-logo-bw-small.jpg)

*TAL* was developed internally within the BBC as a way of vastly simplifying TV application development
whilst increasing the reach of BBC TV applications such as *iPlayer*. Today all of the BBC's HTML-based
TV applications are built using *TAL*.

## How do I get it setup?

1. Install [BrowserSync](http://www.browsersync.io/):

 `npm install -g browser-sync`

 > You might need to use `sudo`, depending on how you installed `npm`.

2. Install the [BrowserSync TAL plugin](https://github.com/rosswilson/browser-sync-tal):

 `npm install -g browser-sync-tal`

  > You might need to use `sudo`, depending on how you installed `npm`.

3. Create a config file (you could check this into your application codebase):

 ```
 module.exports = {
     "proxy": "www.bbc.co.uk/iplayer",
     "plugins": [
         "browser-sync-tal"
     ]
 };
 ```

4. Run BrowserSync:

 `browser-sync start --config browser-sync-iplayer.conf`

5. Get each device to load the URL output in your console labeled "External".

 You could do this via your TVX page.

6. Grab a remote for any one of the devices under-test and press some keys. Your keypresses will be broadcast to all the other devices.

## Use cases of BrowserSync

* Live feedback of CSS or JS changes.
* Regression testing prior to a release.
* Explorative testing, discovering differences between different devices.

## How does it work?

* BrowserSync establishes a 2-way communication channel between each device and your computer.

* This plugin listens for keypress events and derives a TAL keyname using the keyboard mapping config for your device (e.g. VK_UP or VK_DOWN).

* With this device-agnostic keyname we broadcast it over the network to all other devices using SocketIO.

* Upon receiving a network-keypress, we emit a TAL keypress event. From this point onwards your application will behave just as if it had received a normal IR remote control command.
