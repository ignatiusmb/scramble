# ScrambleJS
> Scrambling a text and decoding it letter by letter, giving that password-cracking feel on the website

Built with pure JavaScript and :yellow_heart:
- :tada: easy to use
- :balloon: lightweight
- :zap: no dependencies

## Demo
[ignatiusmb.github.io](https://ignatiusmb.github.io)

## Usage
:heavy_exclamation_mark: **This is meant to be used with short texts like a name and not a full paragraph as it is decoding them letter by letter** :heavy_exclamation_mark:
1. Download [scramble.min.js](https://github.com/ignatiusmb/scramblejs/releases/latest)
2. Source it to the HTML and simply call the function
3. `scramble()` takes a parameter to run which is a DOM containing the text to scramble and decode
```javascript
const specificDiv = document.getElementById("specificDiv");
const nameTag = specificDiv.getElementsByTagName("h1")[0];
scramble(nameTag);
```
4. Use `monospace` fonts for a clean decode
5. Make sure document is ready before using this or just source it at the bottom before the closing `body` tag

---
<p align="center">
  <a href="https://ignatiusmb.github.io">ignatiusmb.io</a>
  &middot;
  <a href="www.imbagus.com">imbagus.com</a>
  &middot;
  <a href="https://github.com/ignatiusmb">GitHub</a>
  &middot;
  <a href="https://gitlab.com/ignatiusmb">GitLab</a>
</p>
