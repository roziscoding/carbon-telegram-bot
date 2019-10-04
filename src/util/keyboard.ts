import { Extra, Markup } from 'telegraf'

type RefreshData = {
  from: number,
  to: number
}

function getEditButton (url: string) {
  return [
    Markup.urlButton('Edit on carbon.now.sh', url, false)
  ]
}

function getRefreshButton (url: string, messageId: number, imageMessageId: number) {
  const buttons = getEditButton(url)
  return [
    [ ...buttons ],
    [
      Markup.callbackButton('Refresh', `refresh_${messageId}_to_${imageMessageId}`, false),
      Markup.callbackButton('Delete', `delete_${imageMessageId}`, false)
    ]
  ]
}

function getButtons (url: string, refresh?: RefreshData) {
  return refresh
    ? getRefreshButton(url, refresh.from, refresh.to)
    : getEditButton(url)
}

function getKeyboardExtra (url: string, refresh?: RefreshData) {
  return Extra.markup(() => getButtons(url, refresh))
}

function getKeyboardString (url: string, refresh?: RefreshData) {
  const buttons = getButtons(url, refresh)
  return JSON.stringify(Markup.inlineKeyboard(buttons as any))
}

function getKeyboardObject (url: string, refresh?: RefreshData) {
  const buttons = getButtons(url, refresh)

  return Markup.inlineKeyboard(buttons as any)
}

export function getKeyboard (url: string, refresh?: RefreshData) {
  return {
    asExtra: () => getKeyboardExtra(url, refresh),
    asString: () => getKeyboardString(url, refresh),
    asObject: () => getKeyboardObject(url, refresh)
  }
}
