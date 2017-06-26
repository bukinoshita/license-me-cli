'use strict'

const licenseMe = require('license-me')
const chalk = require('chalk')
const storage = require('node-persist')
const shoutSuccess = require('shout-success')

const ask = require('./ask')
const askLicense = require('./ask-license')

module.exports = () => {
  askLicense().then(({ licenseType }) => {
    if (
      licenseType === 'GNU LGPLv3' ||
      licenseType === 'Mozilla Public License 2.0' ||
      licenseType === 'The Unlicense'
    ) {
      return licenseMe(licenseType).then(() =>
        shoutSuccess(`${licenseType} license created!`)
      )
    }

    Promise.all([
      storage.getItem('name'),
      storage.getItem('email'),
      storage.getItem('website')
    ]).then(items => {
      const name = items[0]
      const options = { email: items[1], website: items[2] }

      if (name) {
        return licenseMe(licenseType, name, options).then(() =>
          shoutSuccess(`${licenseType.toUpperCase()} license created!`)
        )
      }

      console.log(
        `In order to complete the process we need your ${chalk.italic(
          'name'
        )} to put on ${chalk.bold(
          'readme.md'
        )}.\nYou can use the command '${chalk.bold.blue(
          'license remember'
        )}' to save your informations locally.`
      )

      ask('name').then(({ name }) => {
        licenseMe(licenseType, name, options).then(() =>
          shoutSuccess(`${licenseType} license created!`)
        )
      })
    })
  })
}
