import { Context } from 'telegraf'
import { MessageEntity, Update } from 'telegraf/typings/core/types/typegram'

export type PreMessage = Context<Update.ChannelPostUpdate | Update.MessageUpdate>['message'] & {
  entities: [MessageEntity.PreMessageEntity, ...MessageEntity.PreMessageEntity[]]
  text: string
}
