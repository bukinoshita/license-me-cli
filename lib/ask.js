'use strict'

const chalk = require('chalk')
const inquirer = require('inquirer')

module.exports = type => {
  return inquirer
    .prompt([
      {
        name: type,
        message: `What's your ${type} ${chalk.gray(
          '(this will be on your license)'
        )}:`,
        validate: function(input) {
          const done = this.async()

          if (input.length < 2) {
            done(`Your ${type} have at least 2 letters`)
            return
          }

          done(null, true)
        }
      }
    ])
    .then(answer => answer)
    .catch(err => err)
}
