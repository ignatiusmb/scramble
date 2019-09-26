;(async function() {
  // get latest version
  let response = await fetch('./package.json')
  let data = await response.json()
  document.getElementById('version').textContent = data.version
  // get current github stargazers count
  response = await fetch('https://api.github.com/repos/ignatiusmb/scramble')
  data = await response.json()
  document.getElementById('stargazersCount').textContent = data['stargazers_count']
})()

const fixedUnit = document.getElementById('fixedUnit')
window.addEventListener('scroll', () => {
  const scroll = document.documentElement.scrollTop
  if (scroll >= 48) fixedUnit.style.top = '1em'
  else fixedUnit.style = ''
})

for (const sc of document.querySelectorAll('.scramble-group'))
  scramble.successive(sc.querySelectorAll('span')).run()

const terminal = document.querySelector('article aside .terminal')
const terBody = terminal.querySelector('.terminal-body')
terBody.addEventListener('DOMSubtreeModified', () => {
  while (terBody.childElementCount > 6) terBody.removeChild(terBody.firstChild)
})
const minimizeTerminal = () => {
  terBody.style.display = 'none'
  terminal.querySelector('.terminal-header').style.borderBottom = '2px solid black'
}
const maximizeTerminal = () => (terBody.style.display = 'flex')
const clearTerminal = () => {
  while (terBody.lastChild && terBody.childElementCount > 1) {
    terBody.removeChild(terBody.firstChild)
  }
}

function status(e, status) {
  const clicked = e.target.parentElement.parentElement
  const el = clicked.querySelector('.headline aside')
  el.textContent = el.className = status
}

function stdout(node, runner) {
  const el = node.querySelector('.headline .example')
  terBody.lastElementChild.textContent = runner.original
  terBody.appendChild(document.createElement('code'))
}

for (const section of document.querySelectorAll('#sections section')) {
  const jumbled = scramble(section.querySelector('.example'))
  const buttons = section.querySelector('.buttons').children
  if ((section.id = 'disorder')) {
    const runner = jumbled.worker
    buttons[0].addEventListener('click', () => stdout(section, runner))
    buttons[1].addEventListener('click', () => runner.start())
    buttons[2].addEventListener('click', () => runner.stop())
  }
}
