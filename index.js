const scrambleGroup = document.getElementsByClassName('scramble-group')
for (let i = 0; i < scrambleGroup.length; i++) {
  const group = scrambleGroup[i].getElementsByTagName('span')
  successiveScramble(group)
}

const createTerminal = name => {
  const terminal = document.createElement('div')

  const header = document.createElement('div')
  header.className = 'clog-header'
  const buttons = ['terminal', 'window-minimize', 'window-maximize', 'window-close']
  for (const button of buttons) {
    const span = document.createElement('span')
    span.className = `fas fa-${button}`
    if (button.includes('close')) {
      span.addEventListener('click', () => {
        while (body.lastChild && body.childElementCount > 1) body.removeChild(body.firstChild)
      })
    }
    header.appendChild(span)
    if (button.includes('terminal')) {
      const headerName = document.createElement('span')
      headerName.className = 'terminal'
      headerName.textContent = name
      header.appendChild(headerName)
    }
  }
  terminal.appendChild(header)

  let body = document.createElement('div')
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
      example = disorder(element)
      status.className = 'running'
      for (let i = 0; i < buttons.length; i++) {
        const button = document.createElement('a')
        button.textContent = buttons[i]
        switch (i) {
          case 0:
            button.addEventListener('click', () => {
              terminal.body.lastChild.textContent = example.original
              terminal.body.appendChild(document.createElement('code'))
              if (terminal.childElementCount > 10) document.getElementById('clearlog').click()
            })
            break
          case 1:
            button.addEventListener('click', () => {
              const fooEx = example.process()
              if (fooEx === undefined) return
              status.className = 'running'
              let check = setInterval(() => {
                if (fooEx.finished() === true) {
                  clearInterval(check)
                  status.className = 'finished'
                }
              }, 700)
            })
            break
          case 2:
            button.addEventListener('click', () => {
              example.start()
              status.className = 'running'
            })
            break
          case 3:
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

  let example = document.createElement('div')
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
const reset = document.createElement('a')
reset.id = 'reset'
reset.addEventListener('click', () => {
  while (main.lastChild && main.childElementCount > 0) main.removeChild(main.firstChild)
  addSections()
})

const addSections = () => {
  main.appendChild(
    scrCreateSection('disorder', 'continuous text disorder', 'this text is in disorder', [
      'original',
      'process',
      'start',
      'stop'
    ])
  )
  main.insertAdjacentElement('afterbegin', reset)
}

addSections()

fetch('https://cdn.jsdelivr.net/gh/ignatiusmb/api/html/footer.html')
  .then(response => response.text())
  .then(data => document.querySelector('footer.main-ftr').insertAdjacentHTML('beforeend', data))
