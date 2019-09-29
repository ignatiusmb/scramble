window.addEventListener('load', () => {
  const links = []
  links.push('https://cdn.jsdelivr.net/gh/ignatiusmb/api/footer.js')
  links.push('https://cdn.jsdelivr.net/gh/ignatiusmb/bluesheets/code.min.js')
  links.push('src/gh-pages.js')
  for (const url of links) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.body.appendChild(script)
  }
})
