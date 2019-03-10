const RANDOM_TIME = 44;
/**
 * Generates a random word
 * @param {number} textLen length of textContent
 * @param {number} firstChar for a specific first char
 */
function jumble(textLen, firstChar) {
  let newText = "";
  if (firstChar !== undefined) {
    newText = String.fromCharCode(firstChar);
    for (let i = 1; i < textLen; i++) newText += String.fromCharCode(randNum(33, 126));
  } else
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
 * @param {String} original initial text of the element
 * @param {number} decodeLen farthest index from text to decode 
 * @param {number} firstChar a specific first char index
 */
function decode(original, decodeLen, firstChar) {
  let newText = original.substring(0, decodeLen);
  if (firstChar === undefined)
    return newText + jumble(original.length - decodeLen);
  return newText + jumble(original.length - decodeLen, firstChar);
}

/**
 * Scrambles an element content and rewrite it one by one
 * @param {HTMLElement} elem html element to scramble
 * @param {String} original initial element text
 */
function scramble(elem, original) {
  let text, timer, letterIndex = 0;
  if (original !== undefined) text = original;
  else text = elem.textContent;
  let textLen = text.length;
  let firstIter = disorder(elem);
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
  let executed = Array(elemList.length).fill(false);
  const check = () => {
    let isDone = true;
    for (let i = 0; i < elemList.length; i++) {
      console.log("checking");
      if (inViewport(elemList[i]) && executed[i] !== true) {
        scramble(elemList[i]);
        executed[i] = true;
      }
      if (executed[i] === false)
        isDone = false;
    }
    if (isDone) window.removeEventListener("scroll", check);
  }
  window.addEventListener("scroll", checkExec);
  return {
    status: (index) => {
      return decoded[index];
    }
  };
}

/**
 * Decodes a text with a brute force way
 * @param {boolean} random enables random checks for uncertain time
 * @param {HTMLElement} elem html element to brute force
 */
function bruteforce(random, elem) {
  const text = elem.textContent;
  let textLen = text.length;
  let letterIndex = 0;
  elem.textContent = jumble(textLen);
  if (random) {
    (function check() {
      elem.textContent = decode(text, letterIndex);
      if (elem.textContent.charAt(letterIndex) === text.charAt(letterIndex)) letterIndex++;
      if (letterIndex <= textLen) setTimeout(check, RANDOM_TIME / 2);
      else clearTimeout(check);
    }());
  } else {
    let index = 32;
    (function check() {
      if (index > 126) index = 32;
      elem.textContent = decode(text, letterIndex, index++);
      if (elem.textContent.charAt(letterIndex) === text.charAt(letterIndex)) index = 32, letterIndex++;
      if (letterIndex < textLen) setTimeout(check, RANDOM_TIME / 2);
      else clearTimeout(check);
    }());
  }
  return {
    finished: () => {
      return letterIndex >= textLen;
    }
  }
}