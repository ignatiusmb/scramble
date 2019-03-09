# ScrambleJS &middot; [![](https://data.jsdelivr.com/v1/package/gh/ignatiusmb/scramble.js/badge?style=rounded)](https://www.jsdelivr.com/package/gh/ignatiusmb/scramble.js)
> Scrambling a text and decoding it letter by letter, giving that password-cracking feel on the website

## Getting Started
Please refer to [documentation](https://ignatiusmb.github.io/scramble.js) for use cases

## Usage
:warning: **This is meant to be used with short texts like a name, memory caching for long texts hasn't been tested** :construction:
1. Add the dependencies 
   - [RichJS](https://github.com/ignatiusmb/rich.js)
2. Download [scramble.min.js](https://github.com/ignatiusmb/scramble.js/releases/latest) or use it from cdn provided below
```html
<!-- using latest to always automatically use the latest version -->
<script src="https://cdn.jsdelivr.net/gh/ignatiusmb/scramble.js@latest/lib/scramble.min.js"></script>

<!-- just specifying the major version to automatically receive bug fixes and non-breaking features -->
<script src="https://cdn.jsdelivr.net/gh/ignatiusmb/scramble.js@2/lib/scramble.min.js"></script>

<!-- specifying the complete version to use for some personal reason(?) -->
<script src="https://cdn.jsdelivr.net/gh/ignatiusmb/scramble.js@1.0.1/lib/scramble.min.js"></script>
```
3. Source it to the HTML and simply call the function
4. `scramble` takes a parameter to run which is a DOM containing the text to scramble and decode
```javascript
const specificDiv = document.getElementById("specificDiv");
const nameTag = specificDiv.getElementsByTagName("h1")[0];
scramble(nameTag);
```
5. Use `monospace` fonts for a clean decode with titles
6. Make sure document is ready before using this or just source it at the bottom before the closing `body` tag

### License
ScrambleJS is [MIT licensed](LICENSE)

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
