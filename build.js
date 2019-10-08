const fs = require('fs')
const { rollup } = require('rollup')
const { minify } = require('terser')
const pb = require('pretty-bytes')
const gzip = require('gzip-size')

const pkg = require('./package')
const banner = `/*!
 * Scramble v${pkg.version}
 * Copyright (c) ${new Date().getFullYear()} Ignatius Bagus
 * MIT Licensed
 * scramble.js.org
 */
`

function format(type, file, name) {
  const format = {
    banner,
    format: type,
    file: file
  }
  if (name) format.name = name
  return format
}

console.info('Compiling...')
;(async () => {
  const bundle = await rollup({ input: 'src/index.js' })

  bundle.write(format('cjs', pkg.main))
  bundle.write(format('es', pkg.module))

  const umd = pkg['umd:main']
  await bundle.write(format('umd', umd, pkg['umd:name']))
  const data = fs.readFileSync(umd, 'utf8')
  const { code, error } = minify(data) // minify code
  if (error) return console.error(error.message)
  fs.writeFileSync(umd, `${banner}\n${code}`) // rewrite banner

  const gzipSize = gzip.sync(code)
  console.info('Compilation was successful!')
  console.info(`~> gzip size: ${pb(gzipSize)}`)
})()
