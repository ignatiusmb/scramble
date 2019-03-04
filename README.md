# ScrambleJS &middot; [![](https://data.jsdelivr.com/v1/package/gh/ignatiusmb/scramble.js/badge)](https://www.jsdelivr.com/package/gh/ignatiusmb/scramble.js)
> Scrambling a text and decoding it letter by letter, giving that password-cracking feel on the website

## Getting Started
| Function |
|----------|
| `scramble` |

Please refer to [documentation](https://ignatiusmb.github.io/scramble.js) for use cases

## Usage
:warning: **This is meant to be used with short texts like a name, memory caching for long texts hasn't been tested** :construction:
1. Download [scramble.min.js](https://github.com/ignatiusmb/scramblejs/releases/latest) or use it from cdn provided below
```html
<script src="https://cdn.jsdelivr.net/gh/ignatiusmb/scramble.js@latest/lib/scramble.min.js"></script>
```
You can also manually specify the version to use by replacing `latest` with the desired version
```html
<script src="https://cdn.jsdelivr.net/gh/ignatiusmb/scramble.js@version/lib/scramble.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/ignatiusmb/scramble.js@1.0.2/lib/scramble.min.js"></script>
```
2. Source it to the HTML and simply call the function
3. `scramble` takes a parameter to run which is a DOM containing the text to scramble and decode
```javascript
const specificDiv = document.getElementById("specificDiv");
const nameTag = specificDiv.getElementsByTagName("h1")[0];
scramble(nameTag);
```
4. Use `monospace` fonts for a clean decode
5. Make sure document is ready before using this or just source it at the bottom before the closing `body` tag

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
