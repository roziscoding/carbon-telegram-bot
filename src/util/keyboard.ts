import { Extra, Markup } from 'telegraf'

type RefreshData = {
  from: number
  to: number
  hideRefresh?: boolean
}

function getRefreshButton(messageId: number, imageMessageId: number, hideRefresh = false) {
  const menu = [[Markup.callbackButton('Delete', `delete_${imageMessageId}`, false)]]

  if (!hideRefresh) {
    menu[0].unshift(
      Markup.callbackButton('Refresh', `refresh_${messageId}_to_${imageMessageId}`, false) as any
    )
  }

  return menu
}

function getButtons(refresh?: RefreshData) {
  return refresh ? getRefreshButton(refresh.from, refresh.to, refresh.hideRefresh) : [[]]
}

function getKeyboardExtra(refresh?: RefreshData) {
  return Extra.markup(() => getButtons(refresh))
}

function getKeyboardString(refresh?: RefreshData) {
  const buttons = getButtons(refresh)
  return JSON.stringify(Markup.inlineKeyboard(buttons as any))
}

function getKeyboardObject(refresh?: RefreshData) {
  const buttons = getButtons(refresh)

  return Markup.inlineKeyboard(buttons as any)
}

export function getKeyboard(refresh?: RefreshData) {
  return {
    asExtra: () => getKeyboardExtra(refresh),
    asString: () => getKeyboardString(refresh),
    asObject: () => getKeyboardObject(refresh)
  }
}
