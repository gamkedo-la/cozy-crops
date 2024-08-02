import { FontFamilies } from './Fonts.js'

export const LeftAlign = 'left'
export const CenterAlign = 'center'
export const RightAlign = 'right'
export const TopAlign = 'top'
export const MiddleAlign = 'middle'
export const BottomAlign = 'bottom'

export const UIColor = '#FFFFFF'
export const UIColorDark = '#000000'
export const UIInactiveColor = '#888888'
export const UIDisabledColor = '#444444'
export const UIDangerColor = '#FF0000'
export const UIFontSize = '30px'
export const InGameFontSize = '40px'
export const UIFontFamily = FontFamilies.MedievalSharpRegular
export const TextLineSpacing = 2

export const TitleFontSize = '96px'

export function getFontSizeNumber (fontSize) {
  return parseInt(fontSize.replace('px', ''))
}

export default {
  LeftAlign,
  CenterAlign,
  RightAlign,
  TopAlign,
  MiddleAlign,
  BottomAlign,

  UIColor,
  UIColorDark,
  UIInactiveColor,
  UIDisabledColor,
  UIDangerColor,
  UIFontSize,
  InGameFontSize,
  UIFontFamily,
  TextLineSpacing,
  TitleFontSize,

  getFontSizeNumber
}