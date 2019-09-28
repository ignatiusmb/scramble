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
  while (terBody.childElementCount > 5) terBody.removeChild(terBody.firstChild)
})
const minimizeTerminal = () => {
  terBody.style.display = 'none'
  terminal.querySelector('.terminal-header').style.borderBottom = '2px solid black'
}
const maximizeTerminal = () => (terBody.style.display = 'flex')
const clearTerminal = () => {
  while (terBody.lastChild) terBody.removeChild(terBody.firstChild)
  terBody.appendChild(document.createElement('code'))
}

function changeStatus(section, status) {
  const aside = section.querySelector('aside')
  aside.textContent = aside.className = status
}

function stdout(output) {
  if (terBody.lastElementChild.textContent === '') {
    terBody.lastElementChild.textContent = output
  } else {
    const newline = document.createElement('code')
    newline.textContent = output
    terBody.appendChild(newline)
  }
}

for (const section of document.querySelectorAll('#sections section')) {
  const headline = section.querySelector('.headline')
  const buttons = section.querySelector('.buttons').children
  if (section.id == 'scramble') {
    const jumbled = scramble(headline.querySelector('.example'))
    buttons[0].addEventListener('click', () => stdout(`original text: ${jumbled.worker.original}`))
    buttons[1].addEventListener('click', () => {
      if (!jumbled.finished()) {
        changeStatus(section, 'processing')
        jumbled.run()
        const timer = setInterval(() => {
          if (jumbled.finished()) {
            changeStatus(section, 'finished')
            clearInterval(timer)
          }
        }, 500)
      }
    })
    buttons[2].addEventListener('click', () => stdout(`finished state: ${jumbled.finished()}`))
  } else if (section.id == 'disorder') {
    const runner = scramble(headline.querySelector('.example')).worker
    buttons[0].addEventListener('click', () => stdout(`original text: ${runner.original}`))
    buttons[1].addEventListener('click', () => {
      changeStatus(section, 'running')
      runner.start()
    })
    buttons[2].addEventListener('click', () => {
      changeStatus(section, 'idle')
      runner.stop()
    })
  } else if (section.id == 'successive') {
    const scrambleList = Array.from(headline.querySelectorAll('.example'))
    const successive = scramble.successive(scrambleList)
    buttons[0].addEventListener('click', () => {
      successive.run()
    })
  }
}
