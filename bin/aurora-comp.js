const program = require('commander')
const chalk = require('chalk')
const symbols = require('log-symbols')

program
  .usage('<component-name>')
  .description('generator a component')
  .parse(process.argv)

const componentName = program.args[0]

if (!componentName) {
  program.help()
  return
}

// const {checkComponentName} = require('../lib/utils')
const generatorComponent = require('../lib/generatorComponent')
generatorComponent(componentName)
  .then((res) => {
    res &&
      res.forEach((i) => {
        console.log(symbols.success, chalk.cyan('🎉 create: ') + i)
      })
  })
  .catch((err) => {
    console.log(symbols.error, chalk.red(err))
  })
