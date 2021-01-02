const program = require('commander')
const chalk = require('chalk')
const symbols = require('log-symbols')

program.usage('<api-name>').description('create a api').parse(process.argv)

const apiName = program.args[0]

if (!apiName) {
  program.help()
  return
}

const generatorApi = require('../lib/generatorApi')
generatorApi(apiName)
  .then((res) => {
    res &&
      res.forEach((i) => {
        console.log(symbols.success, chalk.cyan('🎉 create: ') + i)
      })
  })
  .catch((err) => {
    console.log(symbols.error, chalk.red(err))
  })
