;(async () => {
  // get latest version
  let response = await fetch('./package.json')
  let data = await response.json()
  document.getElementById('version').textContent = data.version
})()

const fixedUnit = document.getElementById('fixedUnit')
window.addEventListener('scroll', () => {
  const scroll = document.documentElement.scrollTop
  if (scroll >= 48) fixedUnit.style.top = '1em'
  else fixedUnit.style = ''
})

const title = document.querySelector('header h1')
const description = document.querySelectorAll('header h3 span')
const repeat = () => {
  if (scramble.random(0, 1)) {
    scramble(title).run()
    setTimeout(repeat, 5000)
  } else {
    scramble.successive(description).run()
    setTimeout(repeat, 7000)
  }
}
setTimeout(repeat, 1000)

const terminal = document.querySelector('article aside .terminal')
const terBody = terminal.querySelector('.terminal-body')
const historyLimit = window.matchMedia('(min-width: 769px)').matches ? 25 : 5
terBody.addEventListener('DOMSubtreeModified', () => {
  while (terBody.childElementCount > historyLimit) terBody.removeChild(terBody.firstChild)
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

const changeStatus = (section, status) => {
  const aside = section.querySelector('aside')
  aside.textContent = aside.className = status
}

const stdout = output => {
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
  const buttons = section.querySelectorAll('.buttons span')
  if (section.id === 'scramble') {
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
  } else if (section.id === 'disorder') {
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
  } else if (section.id === 'successive') {
    const successive = scramble.successive(headline.querySelectorAll('.example'))
    buttons[0].addEventListener('click', () => {
      successive.run()
    })
  }
}
