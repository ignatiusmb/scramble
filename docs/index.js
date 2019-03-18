const scrambleGroup = document.getElementsByClassName("scramble-group");
for (let i = 0; i < scrambleGroup.length; i++) {
  const group = scrambleGroup[i].getElementsByTagName("span");
  successiveScramble(group);
}

const mainDemo = ["disorder"];
const sectMain = document.getElementById("main");
for (const demo of mainDemo) {
  const sect = document.createElement("section");
  const title = document.createElement("h2");
  title.dataset.demo = demo;
  sect.appendChild(title);

  const divDemo = document.createElement("div");
  divDemo.className = "demo";
  const headline = document.createElement("div");
  headline.className = "headline";
  let example = document.createElement("div");
  example.className = "example";
  const status = document.createElement("aside");
  headline.appendChild(example);
  headline.appendChild(status);
  divDemo.appendChild(headline);

  const buttons = document.createElement("div");
  buttons.className = "buttons";
  const clogHeader = document.createElement("div");
  clogHeader.className = "clog-header";
  let clog = document.createElement("div");
  clog.className = "clog";
  const clogButtonClass = ["terminal", "window-minimize", "window-maximize", "window-close"];
  for (let i = 0; i < clogButtonClass.length; i++) {
    const clogButton = document.createElement("span");
    clogButton.className = `fas fa-${clogButtonClass[i]}`;
    if (i === clogButtonClass.length - 1) {
      clogButton.id = "clearlog";
      clogButton.addEventListener("click", () => {
        while (clog.lastChild && clog.childElementCount > 1) clog.removeChild(clog.firstChild);
      })
    }
    clogHeader.appendChild(clogButton);
    if (i === 0) {
      const foo = document.createElement("span");
      foo.className = clogButtonClass[i];
      clogHeader.appendChild(foo);
    }
  }
  const firstLine = document.createElement("code");
  clog.appendChild(firstLine);
  const codeblock = document.createElement("pre");
  const code = document.createElement("code");
  code.textContent = "disorder(HTMLElement)";
  codeblock.appendChild(code);
  switch (demo) {
    case "jumble":
      break;
    case "disorder":
      title.textContent = "continuous text disorder";
      const btnName = ["original", "process", "start", "stop"];
      example.textContent = "this text is in disorder";
      example = disorder(example);
      status.className = "running";
      for (let i = 0; i < btnName.length; i++) {
        const btn = document.createElement("a");
        btn.textContent = btnName[i];
        switch (i) {
          case 0:
            btn.addEventListener("click", () => {
              clog.lastChild.textContent = example.original;
              clog.appendChild(document.createElement("code"));
              if (clog.childElementCount > 10)
                document.getElementById("clearlog").click();
            })
            break;
          case 1:
            btn.addEventListener("click", () => {
              const fooEx = example.process();
              if (fooEx === undefined) return;
              status.className = "running";
              let check = setInterval(() => {
                if (fooEx.finished() === true) {
                  clearInterval(check);
                  status.className = "finished";
                }
              }, 700);
            })
            break;
          case 2:
            btn.addEventListener("click", () => {
              example.start();
              status.className = "running";
            })
            break;
          case 3:
            btn.addEventListener("click", () => {
              example.stop();
              status.className = "idle";
            })
        }
        buttons.appendChild(btn);
      }
      break;
  }
  divDemo.appendChild(buttons);
  divDemo.appendChild(clogHeader);
  divDemo.appendChild(clog);
  divDemo.appendChild(codeblock);
  sect.appendChild(divDemo);
  sectMain.appendChild(sect);
}

RichAJAX().get("https://cdn.jsdelivr.net/gh/ignatiusmb/ignatiusmb.github.io@1/dist/footer.html", (data) => {
  document.getElementsByTagName("footer")[0].insertAdjacentHTML("beforeend", data.responseText);
});