;(async function() {
  const response = await fetch('./package.json')
  const json = await response.json()
  document.getElementById('version').textContent = json.version
})()
;(async function() {
  const response = await fetch('https://api.github.com/repos/ignatiusmb/scramble')
  const json = await response.json()
  document.getElementById('stargazersCount').textContent = json['stargazers_count']
})()
;(async function() {
  const response = await fetch('https://cdn.jsdelivr.net/gh/ignatiusmb/api/html/footer.html')
  const html = await response.text()
  document.querySelector('footer.main-ftr').insertAdjacentHTML('beforeend', html)
})()

const ghBar = document.getElementById('githubBar')
const reset = document.getElementById('reset')
reset.addEventListener('click', () => {
  while (main.lastChild && main.childElementCount > 0) main.removeChild(main.firstChild)
  addSections()
})
window.addEventListener('scroll', () => {
  const scroll = document.documentElement.scrollTop
  if (scroll >= 48) {
    ghBar.style.bottom = reset.style.bottom = ghBar.style.left = reset.style.right = '1em'
    ghBar.style.transform = reset.style.transform = 'scale(1)'
  } else ghBar.style = reset.style = ''
})

for (const sc of document.querySelectorAll('.scramble-group'))
  scramble.successive(sc.querySelectorAll('span')).run()

const createTerminal = name => {
  const terminal = document.createElement('div')

  const header = document.createElement('div')
  header.className = 'clog-header'
  const buttons = ['terminal', 'window-minimize', 'window-maximize', 'window-close']
  for (const button of buttons) {
    const span = document.createElement('span')
    span.className = `fas fa-${button}`
    if (button.includes('close'))
      span.addEventListener('click', () => {
        while (body.lastChild && body.childElementCount > 1) body.removeChild(body.firstChild)
      })
    else if (button.includes('minimize'))
      span.addEventListener('click', () => (body.style.display = 'none'))
    else if (button.includes('maximize')) span.addEventListener('click', () => (body.style = ''))

    header.appendChild(span)
    if (button.includes('terminal')) {
      const headerName = document.createElement('span')
      headerName.className = 'terminal'
      headerName.textContent = name
      header.appendChild(headerName)
    }
  }
  terminal.appendChild(header)

  const body = document.createElement('div')
  body.className = 'clog'
  const firstLine = document.createElement('code')
  body.appendChild(firstLine)
  terminal.appendChild(body)

  return { window: terminal, name: name, head: header, body: body }
}

const scrCreateButtons = (element, status, terminal, buttons) => {
  const buttonContainer = document.createElement('div')
  switch (terminal.name) {
    case 'jumble':
      break
    case 'disorder':
      const example = scramble.disorder(element)
      status.className = 'running'
      for (let i = 0; i < buttons.length; i++) {
        const button = document.createElement('a')
        button.classList.add('btn-main')
        button.style.userSelect = 'none'
        button.textContent = buttons[i]
        switch (i) {
          case 0:
            const clear = terminal.window.querySelector('.fa-window.close')
            button.addEventListener('click', () => {
              terminal.body.lastChild.textContent = example.original
              terminal.body.appendChild(document.createElement('code'))
              if (terminal.childElementCount > 10) clear.click()
            })
            break
          case 1:
            button.addEventListener('click', () => {
              example.start()
              status.className = 'running'
            })
            break
          case 2:
            button.addEventListener('click', () => {
              example.stop()
              status.className = 'idle'
            })
        }
        buttonContainer.appendChild(button)
      }
      break
  }
  return buttonContainer
}

const scrCreateSection = (name, titleText, exampleText, buttonNames) => {
  const section = document.createElement('section')

  const title = document.createElement('h2')
  title.textContent = titleText
  section.appendChild(title)

  const divDemo = document.createElement('div')
  divDemo.className = 'demo'

  const headline = document.createElement('div')
  headline.className = 'headline'

  const example = document.createElement('div')
  example.textContent = exampleText
  example.className = 'example'

  const status = document.createElement('aside')
  headline.appendChild(example)
  headline.appendChild(status)
  divDemo.appendChild(headline)

  const terminal = createTerminal(name)

  const buttons = scrCreateButtons(example, status, terminal, buttonNames)
  buttons.className = 'buttons'
  divDemo.appendChild(buttons)

  const codeBlock = document.createElement('pre')
  const code = document.createElement('code')
  code.textContent = 'disorder(HTMLElement)'
  codeBlock.appendChild(code)

  divDemo.appendChild(terminal.window)
  divDemo.appendChild(codeBlock)
  section.appendChild(divDemo)
  return section
}

const main = document.getElementById('sections')

const addSections = () => {
  const frag = document.createDocumentFragment()
  frag.appendChild(
    scrCreateSection('disorder', 'continuous text disorder', 'this is the worker function', [
      'original',
      'start',
      'stop'
    ])
  )
  main.appendChild(frag)
}

addSections()
