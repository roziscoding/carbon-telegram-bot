carbon.now.sh telegram chatbot
========

> This project uses code from [carbon-now-cli](https://github.com/mixn/carbon-now-cli). Go give it a star!
> Also, give [carbon.now.sh](https://github.com/carbon-app/carbon) a star for their awesome work

# Usage
Just hit it [on Telegram](https://t.me/cabonshbot). It'll tell you what to do

# What is it
Telegram chatbot created to generate nice code images using puppeteer on carbon.now.sh.

Everytime it gets a block of pre-formatted code (surrounded by three backticks), it generates an image with on [carbon.now.sh](https://carbon.now.sh), an uses puppeteer to grab a screenshot of that page.

If you want, you can change the default theme and settings for your images by sending the `/settings` command on a private chat with the bot. This settings apply to you regardless of the chat (groups or private) you are in.

# How to run it
The first thing you'll need is an authorization token to communicate with Telegram's bot API. You can get it from [BotFather](https://t.me/botfather).
Then, choose one of the methods below and follow the instructions.

## Locally
- Clone this repo and cd into it
- Run `npm install`
- Run `npm run build`
- Set all environment variables described in the [sample envs file](.envrc.sample)
- Run `npm start`

## Using Docker
- Clone this repo and cd into it
- Run `docker build . -t IMAGE_TAG` replacing IMAGE_TAG with the desired local tag for this image
- - Set all environment variables described in the [sample envs file](.envrc.sample)
- Run `docker run` command mapping the environment variables

## On Heroku

Just click the button below, set the envs and that's it.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Contributing
See [this](CONTRIBUTING.md)
