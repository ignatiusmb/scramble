/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/gh-pages.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/gh-pages.js":
/*!*************************!*\
  !*** ./src/gh-pages.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const scramble = __webpack_require__(/*! ./index */ \"./src/index.js\")\r\n\r\nfor (const sc of document.querySelectorAll('.scramble-group'))\r\n  scramble.successive(sc.querySelectorAll('span')).run()\r\n\r\nconst createTerminal = name => {\r\n  const terminal = document.createElement('div')\r\n\r\n  const header = document.createElement('div')\r\n  header.className = 'clog-header'\r\n  const buttons = ['terminal', 'window-minimize', 'window-maximize', 'window-close']\r\n  for (const button of buttons) {\r\n    const span = document.createElement('span')\r\n    span.className = `fas fa-${button}`\r\n    if (button.includes('close')) {\r\n      span.addEventListener('click', () => {\r\n        while (body.lastChild && body.childElementCount > 1) body.removeChild(body.firstChild)\r\n      })\r\n    } else if (button.includes('minimize')) {\r\n      span.addEventListener('click', () => (body.style.display = 'none'))\r\n    } else if (button.includes('maximize')) {\r\n      span.addEventListener('click', () => (body.style.display = 'block'))\r\n    }\r\n    header.appendChild(span)\r\n    if (button.includes('terminal')) {\r\n      const headerName = document.createElement('span')\r\n      headerName.className = 'terminal'\r\n      headerName.textContent = name\r\n      header.appendChild(headerName)\r\n    }\r\n  }\r\n  terminal.appendChild(header)\r\n\r\n  const body = document.createElement('div')\r\n  body.className = 'clog'\r\n  const firstLine = document.createElement('code')\r\n  body.appendChild(firstLine)\r\n  terminal.appendChild(body)\r\n\r\n  return { window: terminal, name: name, head: header, body: body }\r\n}\r\n\r\nconst scrCreateButtons = (element, status, terminal, buttons) => {\r\n  const buttonContainer = document.createElement('div')\r\n  switch (terminal.name) {\r\n    case 'jumble':\r\n      break\r\n    case 'disorder':\r\n      const example = scramble.disorder(element)\r\n      status.className = 'running'\r\n      for (let i = 0; i < buttons.length; i++) {\r\n        const button = document.createElement('a')\r\n        button.style.userSelect = 'none'\r\n        button.textContent = buttons[i]\r\n        switch (i) {\r\n          case 0:\r\n            const clear = terminal.window.querySelector('.fa-window.close')\r\n            button.addEventListener('click', () => {\r\n              terminal.body.lastChild.textContent = example.original\r\n              terminal.body.appendChild(document.createElement('code'))\r\n              if (terminal.childElementCount > 10) clear.click()\r\n            })\r\n            break\r\n          case 1:\r\n            button.addEventListener('click', () => {\r\n              example.process()\r\n              status.className = 'running'\r\n              const check = setInterval(() => {\r\n                if (example.job().finished() === true) {\r\n                  clearInterval(check)\r\n                  status.className = 'finished'\r\n                }\r\n              }, 700)\r\n            })\r\n            break\r\n          case 2:\r\n            button.addEventListener('click', () => {\r\n              example.start()\r\n              status.className = 'running'\r\n            })\r\n            break\r\n          case 3:\r\n            button.addEventListener('click', () => {\r\n              example.stop()\r\n              status.className = 'idle'\r\n            })\r\n        }\r\n        buttonContainer.appendChild(button)\r\n      }\r\n      break\r\n  }\r\n  return buttonContainer\r\n}\r\n\r\nconst scrCreateSection = (name, titleText, exampleText, buttonNames) => {\r\n  const section = document.createElement('section')\r\n\r\n  const title = document.createElement('h2')\r\n  title.textContent = titleText\r\n  section.appendChild(title)\r\n\r\n  const divDemo = document.createElement('div')\r\n  divDemo.className = 'demo'\r\n\r\n  const headline = document.createElement('div')\r\n  headline.className = 'headline'\r\n\r\n  const example = document.createElement('div')\r\n  example.textContent = exampleText\r\n  example.className = 'example'\r\n\r\n  const status = document.createElement('aside')\r\n  headline.appendChild(example)\r\n  headline.appendChild(status)\r\n  divDemo.appendChild(headline)\r\n\r\n  const terminal = createTerminal(name)\r\n\r\n  const buttons = scrCreateButtons(example, status, terminal, buttonNames)\r\n  buttons.className = 'buttons'\r\n  divDemo.appendChild(buttons)\r\n\r\n  const codeBlock = document.createElement('pre')\r\n  const code = document.createElement('code')\r\n  code.textContent = 'disorder(HTMLElement)'\r\n  codeBlock.appendChild(code)\r\n\r\n  divDemo.appendChild(terminal.window)\r\n  divDemo.appendChild(codeBlock)\r\n  section.appendChild(divDemo)\r\n  return section\r\n}\r\n\r\nconst main = document.getElementById('sections')\r\nconst reset = document.createElement('a')\r\nreset.id = 'reset'\r\nreset.addEventListener('click', () => {\r\n  while (main.lastChild && main.childElementCount > 0) main.removeChild(main.firstChild)\r\n  addSections()\r\n})\r\n\r\nconst addSections = () => {\r\n  main.appendChild(\r\n    scrCreateSection('disorder', 'continuous text disorder', 'this text is in disorder', [\r\n      'original',\r\n      'process',\r\n      'start',\r\n      'stop'\r\n    ])\r\n  )\r\n  main.insertAdjacentElement('afterbegin', reset)\r\n}\r\n\r\naddSections()\r\n\r\nfetch('https://cdn.jsdelivr.net/gh/ignatiusmb/api/html/footer.html')\r\n  .then(response => response.text())\r\n  .then(data => document.querySelector('footer.main-ftr').insertAdjacentHTML('beforeend', data))\r\n\n\n//# sourceURL=webpack:///./src/gh-pages.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Utility\r\n/**\r\n * Check if an element is visible in viewport\r\n * @param {HTMLElement} elem element to be checked\r\n */\r\nfunction inViewport(elem) {\r\n  const rect = elem.getBoundingClientRect()\r\n  return (\r\n    rect.bottom > 0 &&\r\n    rect.right > 0 &&\r\n    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&\r\n    rect.top < (window.innerHeight || document.documentElement.clientHeight)\r\n  )\r\n}\r\n\r\n/**\r\n * Generates a random word\r\n * @param {number} textLen length of textContent\r\n * @param {number} firstChar for a specific first char\r\n */\r\nfunction jumble(textLen, firstChar) {\r\n  let generated = ''\r\n  if (firstChar === undefined) {\r\n    for (let i = 0; i < textLen; i++) {\r\n      generated += String.fromCharCode(scramble.random(33, 126))\r\n    }\r\n  } else {\r\n    generated = String.fromCharCode(firstChar)\r\n    for (let i = 1; i < textLen; i++) {\r\n      generated += String.fromCharCode(scramble.random(33, 126))\r\n    }\r\n  }\r\n  return generated\r\n}\r\n\r\n/**\r\n * Returns decoded letters corresponding to the length given\r\n * @param {String} original initial text of the element\r\n * @param {number} decodeLen farthest index from text to decode\r\n * @param {number} firstChar a specific first char index\r\n */\r\nfunction decode(original, decodeLen, firstChar) {\r\n  const newText = original.substring(0, decodeLen)\r\n  if (firstChar === undefined) return newText + jumble(original.length - decodeLen)\r\n  return newText + jumble(original.length - decodeLen, firstChar)\r\n}\r\n\r\n/**\r\n * Returns decoded letters corresponding to the length given\r\n * @param {HTMLElement} el html element to scramble\r\n */\r\nfunction disorder(el) {\r\n  const original = el.textContent\r\n  const totalChars = original.length\r\n\r\n  const execute = () => (el.textContent = jumble(totalChars))\r\n\r\n  let jumbler = setInterval(execute, scramble.interval)\r\n  let running = true\r\n  let job = null\r\n  return {\r\n    original,\r\n    job: () => job,\r\n    process: () => {\r\n      if (!job || (job && job.finished())) {\r\n        clearInterval(jumbler)\r\n        job = scramble(el, { original })\r\n        job.run()\r\n      } else throw new Error('Job is not finished!')\r\n    },\r\n    start: () => {\r\n      if (!running) {\r\n        running = true\r\n        if (!job || (job && job.finished())) jumbler = setInterval(execute, scramble.interval)\r\n      } else throw new Error('Instance is already running!')\r\n    },\r\n    stop: () => {\r\n      if (job && !job.finished()) throw new Error('Job is not finished!')\r\n      running = false\r\n      clearInterval(jumbler)\r\n    }\r\n  }\r\n}\r\n\r\n/**\r\n * Decodes a text with a brute force way\r\n * @param {boolean} random enables random checks for uncertain time\r\n * @param {HTMLElement} elem html element to brute force\r\n */\r\nfunction linear(random, elem) {\r\n  const text = elem.textContent\r\n  const textLen = text.length\r\n  let letterIndex = 0\r\n  elem.textContent = jumble(textLen)\r\n  if (random) {\r\n    ;(function check() {\r\n      elem.textContent = decode(text, letterIndex)\r\n      if (elem.textContent.charAt(letterIndex) === text.charAt(letterIndex)) letterIndex++\r\n      if (letterIndex <= textLen) setTimeout(check, scramble.interval / 2)\r\n      else clearTimeout(check)\r\n    })()\r\n  } else {\r\n    let index = 32\r\n    ;(function check() {\r\n      if (index > 126) index = 32\r\n      elem.textContent = decode(text, letterIndex, index++)\r\n      if (elem.textContent.charAt(letterIndex) === text.charAt(letterIndex)) {\r\n        index = 32\r\n        letterIndex++\r\n      }\r\n      if (letterIndex < textLen) setTimeout(check, scramble.interval / 2)\r\n      else clearTimeout(check)\r\n    })()\r\n  }\r\n  return {\r\n    finished: () => {\r\n      return letterIndex >= textLen\r\n    }\r\n  }\r\n}\r\n\r\n/**\r\n * Scrambles and decode a list of elements in succession\r\n * @param {NodeListOf<HTMLElement>} elements\r\n */\r\nfunction successive(elements) {\r\n  const execute = idx => {\r\n    if (idx >= next.length) return\r\n\r\n    function check() {\r\n      if (next[idx].job().finished()) execute(idx + 1)\r\n      else setTimeout(check, 1000)\r\n    }\r\n    next[idx].process()\r\n    setTimeout(check, 1000)\r\n  }\r\n  const next = Array.from(elements).map(el => disorder(el))\r\n  return {\r\n    run: () => execute(0)\r\n  }\r\n}\r\n\r\n/**\r\n * Scrambles an element content and rewrite it one by one\r\n * @param {HTMLElement} el html element to scramble\r\n * @param {Object} args additional parameters\r\n */\r\nfunction scramble(el, args) {\r\n  if (el == null) return\r\n  if (el instanceof NodeList) {\r\n    const disarray = Array.from(el).map(x => disorder(x))\r\n    const executed = Array(el.length).fill(false)\r\n\r\n    const events = ['load', 'scroll']\r\n    for (let i = 0; i < el.length; i++) {\r\n      for (const ev of events) {\r\n        window.addEventListener(ev, function check() {\r\n          if (executed[i]) window.removeEventListener(ev, check)\r\n          if (!executed[i] && inViewport(el[i])) {\r\n            executed[i] = true\r\n            disarray[i].process()\r\n          }\r\n        })\r\n      }\r\n    }\r\n    return {\r\n      status: () => executed.every(x => x)\r\n    }\r\n  } else if (el instanceof HTMLElement) {\r\n    let executed = false\r\n    let letterIdx = 0\r\n    let original\r\n\r\n    if (args === undefined) original = el.textContent\r\n    else original = args.original\r\n\r\n    const totalChars = original.length\r\n    const runner = disorder(el)\r\n\r\n    let timer\r\n    const iterateLetters = () => {\r\n      clearInterval(timer)\r\n      timer = setInterval(() => {\r\n        if (letterIdx >= totalChars) clearInterval(timer)\r\n        el.textContent = decode(original, letterIdx)\r\n      }, scramble.interval)\r\n      if (letterIdx++ >= totalChars) clearTimeout(iterateLetters)\r\n      else setTimeout(iterateLetters, 432)\r\n    }\r\n    return {\r\n      finished: () => letterIdx >= totalChars,\r\n      run: () => {\r\n        if (executed) return\r\n        executed = true\r\n        runner.stop()\r\n        iterateLetters()\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nscramble.interval = 42\r\nscramble.disorder = disorder\r\nscramble.successive = successive\r\n\r\nscramble.random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min\r\n\r\nmodule.exports = scramble\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });