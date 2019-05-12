const scrambleGroup = document.getElementsByClassName('scramble-group');
for (let i = 0; i < scrambleGroup.length; i++) {
  const group = scrambleGroup[i].getElementsByTagName('span');
  successiveScramble(group);
}

const createTerminal = () => {
  const terminal = document.createElement('div');

  const header = document.createElement('div');
  header.className = 'clog-header';
  const buttons = ['terminal', 'window-minimize', 'window-maximize', 'window-close'];
  for (const button of buttons) {
    const span = document.createElement('span');
    span.className = `fas fa-${button}`;
    if (button.includes('close')) {
      span.addEventListener('click', () => {
        while (body.lastChild && body.childElementCount > 1) body.removeChild(body.firstChild);
      });
    }
    header.appendChild(span);
    if (button.includes('terminal')) {
      const headerName = document.createElement('span');
      headerName.className = 'terminal';
      header.appendChild(headerName);
    }
  }
  terminal.appendChild(header);

  let body = document.createElement('div');
  body.className = 'clog';
  const firstLine = document.createElement('code');
  body.appendChild(firstLine);
  terminal.appendChild(body);

  return { window: terminal, head: header, body: body };
};

const scrCreateSection = (name, buttonNames) => {
  const section = document.createElement('section');

  const title = document.createElement('h2');
  section.appendChild(title);

  const divDemo = document.createElement('div');
  divDemo.className = 'demo';
  const headline = document.createElement('div');
  headline.className = 'headline';
  let example = document.createElement('div');
  example.className = 'example';
  const status = document.createElement('aside');
  headline.appendChild(example);
  headline.appendChild(status);
  divDemo.appendChild(headline);
  const buttons = document.createElement('div');
  buttons.className = 'buttons';

  const terminal = createTerminal();

  const codeblock = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = 'disorder(HTMLElement)';
  codeblock.appendChild(code);
  switch (name) {
    case 'jumble':
      break;
    case 'disorder':
      title.textContent = 'continuous text disorder';
      const btnName = buttonNames;
      example.textContent = 'this text is in disorder';
      example = disorder(example);
      status.className = 'running';
      for (let i = 0; i < btnName.length; i++) {
        const btn = document.createElement('a');
        btn.textContent = btnName[i];
        switch (i) {
          case 0:
            btn.addEventListener('click', () => {
              terminal.body.lastChild.textContent = example.original;
              terminal.body.appendChild(document.createElement('code'));
              if (terminal.childElementCount > 10) document.getElementById('clearlog').click();
            });
            break;
          case 1:
            btn.addEventListener('click', () => {
              const fooEx = example.process();
              if (fooEx === undefined) return;
              status.className = 'running';
              let check = setInterval(() => {
                if (fooEx.finished() === true) {
                  clearInterval(check);
                  status.className = 'finished';
                }
              }, 700);
            });
            break;
          case 2:
            btn.addEventListener('click', () => {
              example.start();
              status.className = 'running';
            });
            break;
          case 3:
            btn.addEventListener('click', () => {
              example.stop();
              status.className = 'idle';
            });
        }
        buttons.appendChild(btn);
      }
      break;
  }
  divDemo.appendChild(buttons);
  divDemo.appendChild(terminal.window);
  divDemo.appendChild(codeblock);
  section.appendChild(divDemo);
  return section;
};

const main = document.getElementById('sections');
main.appendChild(scrCreateSection('disorder', ['original', 'process', 'start', 'stop']));

fetch('https://cdn.jsdelivr.net/gh/ignatiusmb/ignatiusmb.github.io/dist/footer.html')
  .then(response => {
    return response.text();
  })
  .then(data => {
    document.getElementById('footer').insertAdjacentHTML('beforeend', data);
  });
