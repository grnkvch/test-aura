
const fs = require('fs')
const path = require('path')

function logFail(...arg) {
  console.log('\x1b[31m', ...arg, '\n\x1b[0m')
}

const [compName] = process.argv.slice(2)

const files = [
  {
    content: name => (`export { ${name} } from './${name}'\n`),
    name: 'index.js',
  },
  {
    content: name => (
      `import React from 'react'
import style from './${name}.module.css'
export function ${name}() {
  return null
}
`),
    name: name => `${name}.jsx`,
  },
  {
    name: name => `${name}.module.css`,
  },
]

if (!compName) {
  logFail('Enter component name')
  process.exit(1)
}

const target = path.join(__dirname, '../src/components')
const compDir = `${target}/${compName}`

fs.mkdirSync(compDir)
fs.writeFileSync(`${target}/index.js`, `export * from './${compName}'\n`, { flag: 'a' })
files.forEach(({ name, content }, index) => {
  if (!name) {
    logFail(`There's no file name in config.\nElement N${index}`)
  }
  const fileName = typeof name === 'string' ? name : name(compName)

  const fileContent = content ? typeof content === 'string' ? name : content(compName) : ''

  fs.writeFileSync(`${compDir}/${fileName}`, fileContent)
})