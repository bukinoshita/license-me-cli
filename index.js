#!/usr/bin/env node
'use strict'

const path = require('path')
const meow = require('meow')
const updateNotifier = require('update-notifier')
const storage = require('node-persist')
const shoutSuccess = require('shout-success')

const createLicense = require('./lib/create-license')
const ask = require('./lib/ask')

const cli = meow(
  `
  Usage:
    $ license                Create a license for your project
    $ license remember       Save your name locally and we will stop asking everytime you run

  Example:
    $ license
    $ license remember
    $ license remember -f

  Options:
    -f, --full               Save your name, email and website
    -h, --help               Show help options
    -v, --version            Show version
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const run = () => {
  storage.initSync({ dir: path.resolve(__dirname, './license-me-cli') })

  if (cli.input[0] === 'remember') {
    if (cli.flags.f) {
      return ask('name').then(({ name }) => {
        ask('email').then(({ email }) => {
          ask('website').then(({ website }) => {
            Promise.all([
              storage.setItem('name', name),
              storage.setItem('email', email),
              storage.setItem('website', website)
            ]).then(() => shoutSuccess(`${name}, your informations was saved!`))
          })
        })
      })
    }

    return ask('name').then(({ name }) => {
      storage
        .setItem('name', name)
        .then(() => shoutSuccess(`${name}, your name was saved!`))
    })
  }

  createLicense()
}

run()
