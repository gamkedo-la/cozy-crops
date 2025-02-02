import { FontFamilies } from './Fonts.js'

const Constants = {
  CanvasClearColor: '#000000',
  CanvasHeight: 900,
  CanvasScale: 1,
  CanvasWidth: 1280,
  ImageScale: 2,
  MainMenuFontSize: 36,
  MainMenuFontFamily: FontFamilies.LuckyFarmer,
  MainMenuTextColor: '#FFFFFF',
  SceneTitleFontSize: 96,
  TileHeight: 16,
  TileWidth: 16,
  TitleFontSize: 300,
  TitleFontFamily: FontFamilies.FarmVintage,
  TitleTextColor: 'beige',
  SHADOWS_ENABLED: false, // if true, imageManager.draw renders a darkened upside-down version of every sprite
  //turn off for performance issues
}

export default Constants
export const {
  CanvasClearColor,
  CanvasHeight,
  CanvasWidth,
  CanvasScale,
  ImageScale,
  MainMenuTextColor,
  TileHeight,
  TileWidth,
  SHADOWS_ENABLED
} =  Constants