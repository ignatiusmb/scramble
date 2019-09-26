window.addEventListener('load', () => {
  for (const url of ['lib/scramble.min.js', 'src/gh-pages.js']) {
    const script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
  }
})
