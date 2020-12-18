const chalk = require('chalk')

const log = console.log

exports.checkComponentName = (name, type) => {
  let _state = false
  switch (type) {
    case 'B':
      _state = /^[A-Z]+/.test(name)
      !_state && log(chalk.red('Please use UpperCamelCase'))
      break
    case 'S':
      _state = /^[a-z]+/.test(name)
      !_state && log(chalk.red('Please use LowerCamelCase'))
      break
    default:
      _state = false
      !_state && log(chalk.red('Please use UpperCamelCase'))
  }

  return _state
}
