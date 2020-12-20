const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')
const metalsmith = require('metalsmith')
const {CONFIG, ERR_MSG} = require('../config')

/**
 * Gnerator a store
 * @param {string} name store name
 */
module.exports = (name) => {
  const _srcPath = path.join(process.cwd(), CONFIG.srcBase)
  const _templatePath = path.join(__dirname, '../templates/Stores')
  const _targetPath = path.join(_srcPath, CONFIG.storePath)

  return new Promise((resolve, reject) => {
    const nameArr = name.split('/')
    const storeName = nameArr.pop()

    fs.stat(_srcPath, (_, stats) => {
      if (!stats || !stats.isDirectory()) {
        reject(ERR_MSG.doNotHaveSrc)
      } else {
        fs.stat(_targetPath, (_, stats) => {
          if (!stats) {
            const pathArr = []
            const Metal = metalsmith(process.cwd())
              .metadata({
                storeName,
                StoreName:
                  storeName.slice(0, 1).toUpperCase() + storeName.slice(1),
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
                files[n] = {contents: Buffer.from(handlebars.compile(t)(meta))}
                pathArr.push(path.join(CONFIG.srcBase, CONFIG.storePath, n))
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
            reject(ERR_MSG.pageExists)
          }
        })
      }
    })
  })
}
