const RANDOM_TIME = 44;

/**
 * Generates a random word
 * @param {number} textLen length of textContent
 */
function jumble(textLen) {
  let newText = "";
  for (let i = 0; i < textLen; i++) newText += String.fromCharCode(randNum(33, 126));
  return newText;
}

/**
 * Returns decoded letters corrseponding to the length given
 * @param {HTMLElement} elem html element to scramble
 */
function disorder(elem) {
  const original = elem.textContent;
  const repeat = setInterval(() => {
    elem.textContent = jumble(original.length);
  }, RANDOM_TIME);
  return {
    original,
    process: () => {
      clearInterval(repeat);
      return scramble(elem, original);
    },
    start: () => {
      setInterval(repeat, RANDOM_TIME);
    },
    stop: () => {
      clearInterval(repeat);
    }
  };
}

/**
 * Returns decoded letters corrseponding to the length given
 * @param {String} original
 * @param {number} decodeLen 
 */
function decode(original, decodeLen) {
  let newText = original.substring(0, decodeLen);
  return newText + jumble(original.length - decodeLen);
}

/**
 * Scrambles an element content and rewrite it one by one
 * @param {HTMLElement} elem html element to scramble
 * @param {String} original initial element text
 */
function scramble(elem, original) {
  let firstIter = disorder(elem);
  let text, timer, letterIndex = 0;
  if (original !== undefined) text = original;
  else text = elem.textContent;
  let textLen = text.length;
  (function iteration() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (letterIndex >= textLen) clearInterval(timer);
      firstIter.stop();
      elem.textContent = decode(text, letterIndex);
    }, RANDOM_TIME);
    if (letterIndex++ >= textLen)
      clearTimeout(iteration);
    else
      setTimeout(iteration, 313);
  }());
  return {
    finished: () => {
      return letterIndex >= textLen;
    }
  }
}

/**
 * Scrambles a list of elements
 * @param {NodeListOf<HTMLElement>} elemList 
 */
function scrambleAll(elemList) {
  const decoded = Array(elemList.length).fill(false);
  const checkExec = () => {
    if (!Object.keys(decoded).every((k) => {
        return decoded[k] === true;
      })) {
      for (let i = 0; i < elemList.length; i++) {
        if (decoded[i] === true) continue;
        if (inViewport(elemList[i])) {
          scramble(elemList[i]);
          decoded[i] = true;
        }
      }
    } else {
      window.removeEventListener("scroll", checkExec);
    }
  }
  window.addEventListener("scroll", checkExec);
  return {
    status: (index) => {
      return decoded[index];
    }
  };
}