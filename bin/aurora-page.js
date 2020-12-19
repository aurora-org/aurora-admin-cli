const program = require('commander')
const chalk = require('chalk')
const symbols = require('log-symbols')
const shell = require('shelljs')

program
  .usage('<page-name> [options]')
  .description('generator a page')
  .option('-o --observer', 'observer page')
  .parse(process.argv)

const pageName = program.args[0]
const {observer} = program

if (!pageName) {
  program.help()
  return
}

const generatorPage = require('../lib/generatorPage')
if (!observer) {
  generatorPage(pageName)
    .then((res) => {
      res &&
        res.forEach((i) => {
          console.log(symbols.success, chalk.cyan('🎉 create: ') + i)
        })
    })
    .catch((err) => {
      console.log(symbols.error, chalk.red(err))
    })
}
