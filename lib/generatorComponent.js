const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')
const metalsmith = require('metalsmith')
const { CONFIG, ERR_MSG } = require('../config')

/**
 * Generater a component.
 * @param {string} name Component name
 */
module.exports = (name) => {
  const _srcPath = path.join(process.cwd(), CONFIG.srcBase)
  const _templatePath = path.join(__dirname, '../templates/Component')
  const _targetPath = path.join(_srcPath, CONFIG.componentPath, name)

  return new Promise((resolve, reject) => {
    const nameArr = name.split('/')
    const componentName = nameArr.pop()

    fs.stat(_srcPath, (err, stats) => {
      if (!stats || !stats.isDirectory()) {
        reject(ERR_MSG.doNotHaveSrc)
      } else {
        fs.stat(_targetPath, (err, stats) => {
          if (!stats) {
            const pathArr = []
            const Metal = metalsmith(process.cwd())
              .metadata({
                ComponentName:
                  componentName.slice(0, 1).toUpperCase() +
                  componentName.slice(1),
              })
              .clean(false)
              .source(_templatePath)
              .destination(_targetPath)

            Metal.use((files, metalsmith, done) => {
              const meta = metalsmith.metadata()

              Object.keys(files).forEach((file) => {
                const t = files[file].contents.toString()
                const n = handlebars.compile(file)(meta) // replace filename
                delete files[file]
                files[n] = { contents: Buffer.from(handlebars.compile(t)(meta)) }
                pathArr.push(
                  path.join(CONFIG.srcBase, CONFIG.componentPath, name, n),
                )
              })

              done()
            }).build((err) => {
              if (err) {
                reject(err)
              } else {
                resolve(pathArr)
              }
            })
          } else {
            reject(ERR_MSG.componentExists)
          }
        })
      }
    })
  })
}
