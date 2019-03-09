/**
 * Generates a random word
 * @param {number} textLen length of textContent
 */
function jumble(textLen) {
  let newText = "";
  while (--textLen)
    newText += String.fromCharCode(randNum(33, 126));
  return newText;
}

/**
 * Returns decoded letters corrseponding to the length given
 * @param {HTMLElement} elem html element to scramble
 */
function disorder(elem) {
  const original = elem.textContent;
  let repeat = (() => {
    elem.textContent = jumble(original.length);
    setTimeout(repeat, 30);
  }());
  return {
    original,
    process: () => {
      clearTimeout(repeat);
      scramble(elem, original);
    },
    start: () => {
      setTimeout(repeat, 30);
    },
    stop: () => {
      clearTimeout(repeat);
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
  return newText + jumble(nameLen - decodeLen);
}

/**
 * Scrambles an element content and rewrite it one by one
 * @param {HTMLElement} elem html element to scramble
 * @param {String} original initial element text
 */
function scramble(elem, original) {
  const text;
  if (original !== undefined) text = original;
  else text = elem.textContent;
  const textLen = text.length;
  let letterIndex = 0;

  function repeat(index: number) {
    elem.textContent = decode(text, index);
  }
  (function iteration() {
    (function timer() {
      repeat(letterIndex);
      setTimeout(timer, 30);
    }());
    if (letterIndex++ === textLen) {
      clearTimeout(scrambleTimer);
      clearTimeout(iteration);
    }
    setTimeout(iteration, 300);
  }());
  return {
    finished: () => {
      return letterIndex >= textLen;
    }
  }
}