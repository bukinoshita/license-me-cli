'use strict'

const inquirer = require('inquirer')

module.exports = () => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'licenseType',
        default: 'MIT',
        message: `Which license do you want to use?`,
        choices: [
          'MIT',
          'Apache License 2.0',
          'GNU AGPLv3',
          'GNU GPLv3',
          'GNU LGPLv3',
          'Mozilla Public License 2.0',
          'The Unlicense'
        ]
      }
    ])
    .then(choice => choice)
    .catch(err => err)
}
