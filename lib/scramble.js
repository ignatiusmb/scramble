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
 * @author Ignatius Bagus
 * @param {Object} textElement html element to scramble
 */
function scramble(textElement) {
  const initialName = textElement.textContent;
  const nameLen = textElement.textContent.length;

  /**
   * Change the textElement content corresponding to how much decoded letters
   * @param {number} decodedLetters
   */
  function scramble(decodedLetters) {
    let newText = "";
    if (decodedLetters > 0) newText = initialName.substr(0, decodedLetters);
    textElement.textContent = newText + jumble(nameLen - decodedLetters);
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

  this.finished = () => {
    return letterIndex >= nameLen;
  }
}