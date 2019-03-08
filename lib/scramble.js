/**
 * Generates the random text
 * 
 * Printable ASCII starts at 32 and ends at 126, excluding SPACE (32) which is not compatible with some monospaced fonts
 * @param {number} textLen length of textContent
 */
function jumble(textLen) {
  let newText = "";
  for (let i = 0; i < textLen; i++) {
    newText += String.fromCharCode(randNum(33, 126));
  }
  return newText;
}

/**
 * Scrambles an element content and rewrite it one by one
 * @param {HTMLElement} elem html element to scramble
 */
function scramble(elem) {
  const initialName = elem.textContent;
  const nameLen = elem.textContent.length;

  function scramble(decodedLetters: number) {
    let newText = "";
    if (decodedLetters > 0) newText = initialName.substr(0, decodedLetters);
    elem.textContent = newText + jumble(nameLen - decodedLetters);
  }
  let letterIndex = 0;
  let scrambleTimer = setInterval(() => {
    scramble(letterIndex);
  }, 30);
  let letterIteration = setInterval(() => {
    clearInterval(scrambleTimer);
    scrambleTimer = setInterval(() => {
      scramble(letterIndex);
    }, 30);
    if (letterIndex++ === nameLen) {
      clearInterval(scrambleTimer);
      clearInterval(letterIteration);
    }
  }, 300);

  return {
    finished: () => {
      return letterIndex >= nameLen;
    }
  }
}