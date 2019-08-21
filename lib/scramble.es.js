/*!
 * ScrambleJS v2.1.4
 * Copyright(c) 2019 Ignatius Bagus
 * MIT Licensed
 * scramble.js.org
 */

// Utility
/**
 * Check if an element is visible in viewport
 * @param {HTMLElement} elem element to be checked
 */
function inViewport(elem) {
  const rect = elem.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  )
}

/**
 * Generates a random word
 * @param {number} textLen length of textContent
 * @param {number} firstChar for a specific first char
 */
function jumble(textLen) {
  let generated = '';
  const randomChar = () => String.fromCharCode(scramble.random(33, 126));
  for (let i = 0; i < textLen; i++) generated += randomChar();
  return generated
}

/**
 * Returns decoded letters corresponding to the length given
 * @param {String} original initial text of the element
 * @param {number} decodeLen farthest index from text to decode
 * @param {number} firstChar a specific first char index
 */
function decode(original, decodeLen) {
  const newText = original.substring(0, decodeLen);
  return newText + jumble(original.length - decodeLen)
}

/**
 * Returns decoded letters corresponding to the length given
 * @param {HTMLElement} el html element to scramble
 */
function disorder(el) {
  const original = el.textContent;
  const totalChars = original.length;

  const execute = () => (el.textContent = jumble(totalChars));

  let jumbler = setInterval(execute, scramble.interval);
  let running = true;
  return {
    original,
    start: () => {
      if (!running) {
        running = true;
        jumbler = setInterval(execute, scramble.interval);
      } else throw new Error('Instance is already running!')
    },
    stop: () => {
      if (!running) return
      running = false;
      clearInterval(jumbler);
    }
  }
}

/**
 * Scrambles and decode a list of elements in succession
 * @param {NodeListOf<HTMLElement>} elements
 */
function successive(elements) {
  const execute = idx => {
    if (idx >= next.length) return
    function check() {
      if (next[idx].finished()) execute(idx + 1);
      else setTimeout(check, 1000);
    }
    next[idx].run();
    setTimeout(check, 1000);
  };
  const next = Array.from(elements).map(el => scramble(el));
  return {
    run: () => execute(0)
  }
}

/**
 * Scrambles an element content and rewrite it one by one
 * @param {HTMLElement} el html element to scramble
 * @param {Object} args additional parameters
 */
function scramble(el, args) {
  if (el == null) return
  if (el instanceof NodeList) {
    const disarray = Array.from(el).map(x => scramble(x));
    const executed = Array(el.length).fill(false);

    const events = ['load', 'scroll'];
    for (let i = 0; i < el.length; i++) {
      for (const ev of events) {
        window.addEventListener(ev, function check() {
          if (executed[i]) window.removeEventListener(ev, check);
          if (!executed[i] && inViewport(el[i])) {
            executed[i] = true;
            disarray[i].run();
          }
        });
      }
    }
    return {
      status: () => executed.every(x => x)
    }
  } else if (el instanceof HTMLElement) {
    let executed = false;
    let letterIdx = 0;
    let original;

    if (args === undefined) original = el.textContent;
    else original = args.original;

    const totalChars = original.length;
    const runner = disorder(el);

    let timer;
    const iterateLetters = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        if (letterIdx >= totalChars) clearInterval(timer);
        el.textContent = decode(original, letterIdx);
      }, scramble.interval);
      if (letterIdx++ >= totalChars) clearTimeout(iterateLetters);
      else setTimeout(iterateLetters, 432);
    };
    return {
      finished: () => letterIdx >= totalChars,
      run: () => {
        if (executed) return
        executed = true;
        runner.stop();
        iterateLetters();
      },
      worker: runner
    }
  }
}

scramble.interval = 42;
scramble.disorder = disorder;
scramble.successive = successive;

scramble.random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default scramble;
