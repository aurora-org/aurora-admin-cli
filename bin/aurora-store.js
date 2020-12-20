const program = require('commander')
const chalk = require('chalk')
const symbols = require('log-symbols')
const shell = require('shelljs')

program.usage('<store-name>').description('create a store').parse(process.argv)

const storeName = program.args[0]

if (!storeName) {
  program.help()
  return
}

const generatorStore = require('../lib/generatorStore')
generatorStore(storeName)
  .then((res) => {
    res &&
      res.forEach((i) => {
        console.log(symbols.success, chalk.cyan('🎉 create: ') + i)
      })
  })
  .catch((err) => {
    console.log(symbols.error, chalk.red(err))
  })
