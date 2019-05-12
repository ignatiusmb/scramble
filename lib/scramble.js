// Global
const RANDOM_TIME = 42;

// Utility
/**
 * Check if an element is visible in viewport
 * @param {HTMLElement} elem element to be checked
 */
const inViewport = elem => {
  const rect = elem.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
};

/**
 * Generates random number from given range
 * @param {number} min minimum number allowed
 * @param {number} max maximum number allowed
 */
const randNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random word
 * @param {number} textLen length of textContent
 * @param {number} firstChar for a specific first char
 */
const jumble = (textLen, firstChar) => {
  let newText = '';
  if (firstChar !== undefined) {
    newText = String.fromCharCode(firstChar);
    for (let i = 1; i < textLen; i++) newText += String.fromCharCode(randNum(33, 126));
  } else for (let i = 0; i < textLen; i++) newText += String.fromCharCode(randNum(33, 126));
  return newText;
};

/**
 * Returns decoded letters corrseponding to the length given
 * @param {HTMLElement} elem html element to scramble
 */
const disorder = elem => {
  const original = elem.textContent;
  let processed = false;
  let repeat = setInterval(() => {
    elem.textContent = jumble(original.length);
  }, RANDOM_TIME);
  return {
    original,
    processed,
    process: () => {
      if (processed) return;
      clearInterval(repeat);
      processed = true;
      return scramble(elem, original);
    },
    start: () => {
      clearInterval(repeat);
      repeat = setInterval(() => {
        elem.textContent = jumble(original.length);
      }, RANDOM_TIME);
    },
    stop: () => {
      clearInterval(repeat);
    }
  };
};

/**
 * Returns decoded letters corrseponding to the length given
 * @param {String} original initial text of the element
 * @param {number} decodeLen farthest index from text to decode
 * @param {number} firstChar a specific first char index
 */
const decode = (original, decodeLen, firstChar) => {
  let newText = original.substring(0, decodeLen);
  if (firstChar === undefined) return newText + jumble(original.length - decodeLen);
  return newText + jumble(original.length - decodeLen, firstChar);
};

/**
 * Scrambles a list of elements
 * @param {NodeListOf<HTMLElement>} elemList
 */
const scrambleAll = elemList => {
  const listSize = elemList.length;
  let disarray = [];
  let executed = Array(listSize).fill(false);
  for (let i = 0; i < listSize; i++) disarray.push(disorder(elemList[i]));
  (function check() {
    for (let i = 0; i < listSize; i++) {
      if (executed[i] === false && inViewport(elemList[i])) {
        disarray[i].process();
        executed[i] = true;
      }
    }
    if (arrayCheck(executed, true)) {
      clearTimeout(check);
    } else setTimeout(check, 500);
  })();
  return {
    status: index => {
      return decoded[index];
    }
  };
};

/**
 * Decodes a text with a brute force way
 * @param {boolean} random enables random checks for uncertain time
 * @param {HTMLElement} elem html element to brute force
 */
const bruteforce = (random, elem) => {
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
    })();
  } else {
    let index = 32;
    (function check() {
      if (index > 126) index = 32;
      elem.textContent = decode(text, letterIndex, index++);
      if (elem.textContent.charAt(letterIndex) === text.charAt(letterIndex))
        (index = 32), letterIndex++;
      if (letterIndex < textLen) setTimeout(check, RANDOM_TIME / 2);
      else clearTimeout(check);
    })();
  }
  return {
    finished: () => {
      return letterIndex >= textLen;
    }
  };
};

/**
 * Scrambles and decode a list of elements in succession
 * @param {NodeListOf<HTMLElement>} elemList
 */
const successiveScramble = elemList => {
  let next = [];
  let recursiveExec = index => {
    if (index >= next.length) return;
    next[index] = next[index].process();
    (function repeat() {
      if (next[index].finished()) recursiveExec(index + 1);
      else setTimeout(repeat, 1000);
    })();
  };
  for (let i = 0; i < elemList.length; i++) next.push(disorder(elemList[i]));
  recursiveExec(0);
};

let instanceID = 0;
const createInstance = params => {
  const id = instanceID++;
  const element = params.el;
  const variation = params.var;
  return {
    id: id,
    el: element,
    var: variation
  };
};

// Public instance
/**
 * Scrambles an element content and rewrite it one by one
 * @param {HTMLElement} elem html element to scramble
 * @param {String} original initial element text
 */
const scramble = (elem, original) => {
  let text,
    timer,
    letterIndex = 0;
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
    if (letterIndex++ >= textLen) clearTimeout(iteration);
    else setTimeout(iteration, 432);
  })();
  return {
    finished: () => {
      return letterIndex >= textLen;
    }
  };
};
