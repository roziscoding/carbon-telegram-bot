import { ReadableCarbonConfig, defaultCarbonConfig } from '../../util/carbon/config'

export type UserConfig = {
  deleteOriginalMessage: boolean
} & ReadableCarbonConfig

export const defaultUserConfig: UserConfig = {
  deleteOriginalMessage: false,
  theme: defaultCarbonConfig.t,
  paddingHorizontal: defaultCarbonConfig.ph,
  paddingVertical: defaultCarbonConfig.pv,
  dropShadow: defaultCarbonConfig.ds,
  backgroundColor: defaultCarbonConfig.bg,
  windowTheme: defaultCarbonConfig.wt,
  language: defaultCarbonConfig.l,
  dropShadowOffsetY: defaultCarbonConfig.dsyoff,
  dropShadowBlurRadius: defaultCarbonConfig.dsblur,
  windowControls: defaultCarbonConfig.wc,
  widthAdjustment: defaultCarbonConfig.wa,
  lineNumbers: defaultCarbonConfig.ln,
  fontFamily: defaultCarbonConfig.fm,
  fontSize: defaultCarbonConfig.fs,
  lineHeight: defaultCarbonConfig.lh,
  squaredImage: defaultCarbonConfig.si,
  exportSize: defaultCarbonConfig.es,
  watermark: defaultCarbonConfig.wm
}
