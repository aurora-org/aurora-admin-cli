#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

program
  .version('1.0.0', '-v --version')
  .usage('<command> [name]')
  .command('init', 'create a new project')
  .command('comp', 'create a component')
  .command('page', 'create a page')
  .command('store', 'create a store')

program.on('--help', () => {
  console.log('')
  console.log(chalk.green('Examples:'))
  console.log(chalk.green('  $aurora init demo'))
  console.log(chalk.green('  $aurora comp Header'))
  console.log(chalk.green('  $aurora page Login [-o]'))
})

program.parse(process.argv)
