const program = require('commander')
const chalk = require('chalk')

program
  .usage('<component-name> [options]')
  .description('generator a component')
  .option('-d --dumb', 'dumb components')
  .option('-s --smart', 'smart components')
  .parse(process.argv)

const componentName = program.args[0]
const {dumb, smart} = program

if (!componentName || (smart && dumb) || !(smart || dumb)) {
  program.help()
  return
}

const {checkComponentName} = require('../lib/utils')