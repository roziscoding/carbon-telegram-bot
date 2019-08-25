carbon.now.sh telegram chatbot
========

> This project uses code from [carbon-now-cli](https://github.com/mixn/carbon-now-cli). Go give it a star!

# What is it
Telegram chatbot created to generate nice code images using puppeteer on carbon.now.sh.

Everytime it gets a block or line of pre-formatted code (surrounded by one or three backticks), it generates an image with default settings (for now) on carbon.now.sh, an uses puppeteer to grab a screenshot of that page.

Configuration options and other features are coming soon. PRs are very welcome.

# How to run it
- Clone this repo and cd into it
- Run `npm install`
- Run `npm run build`
- Set all environment variables described in the [sample envs file](.envrc.sample)
- Run `npm start`

# Contributing
See [this](CONTRIBUTING.md)
