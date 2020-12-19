const fs = require('fs')
const download = require('download-git-repo')
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const ora = require('ora')
const shell = require('shelljs')
const program = require('commander')
const symbols = require('log-symbols')
const chalk = require('chalk')
const renderLogo = require('../lib/logo')

// check if has git
if (!shell.which('git')) {
  console.log(symbols.error, chalk.red('The script requires git!'))
  shell.exit(1)
}

renderLogo()

program.usage('<project-name>').parse(process.argv)

const name = program.args[0]

// check if dir is exists
if (!fs.existsSync(name)) {
  const spinner = ora('Downloading template....')
  spinner.start()
  download(
    'github.com:alazypig/react-admin-template#main',
    name,
    {clone: true},
    (err) => {
      if (err) {
        spinner.fail()
        console.log(symbols.error, chalk.red(err))
      } else {
        spinner.succeed()
        const packageJson = `${name}/package.json`
        const readMe = `${name}/README.md`

        if (fs.existsSync(packageJson)) {
          const content = fs.readFileSync(packageJson).toString()
          const result = handlebars.compile(content)({name})
          console.log(result)
          fs.writeFileSync(packageJson, result)
        }

        if (fs.existsSync(readMe)) {
          fs.writeFileSync(
            readMe,
            handlebars.compile(fs.readFileSync(readMe).toString())({name}),
          )
        }

        shell.cd(name)
        shell.exec('git init')
        shell.exec('yarn')

        console.log(symbols.success, chalk.green('Init success!'))
        console.log(
          symbols.success,
          chalk.yellow('Please Read The `README.MD`!'),
        )
      }
    },
  )
} else {
  console.log(symbols.error, chalk.red('The project is already exists!'))
}
