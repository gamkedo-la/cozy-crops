import { ENV } from './Environment.js'

const path = ENV === 'development' ? '../../img/' : 'img/'

const Images = {
  BasePlayer: `${path}BasePlayer - Copy.png`,
  CarpentryIcons: `${path}CarpentryIcons.png`,
  CarpentryItems: `${path}CarpentryItems.png`,
  Curator: `${path}Curator.png`,
  ForageableItems: `${path}Forage.png`,
  Museum: `${path}Museum.png`,
  NPCs: `${path}NPCs.png`,
  ParticleSprite: `${path}particles.png`,
  Plaques: `${path}Plaques.png`,
  Portraits: `${path}Portraits.png`,
  Pregame: `${path}PreGame.png`,
  RainSprite: `${path}rain.png`,
  ShortCrops: `${path}ShortCrops.png`,
  SnowSprite: `${path}snow.png`,
  Statues: `${path}Statues.png`,
  StoreUI: `${path}StoreUI.png`,
  TallCrops: `${path}TallCrops.png`,
  TileSet: `${path}tileset.png`,
  TitleBackground: `${path}TitleScreen.png`,
  Tools: `${path}Tools.png`,
  TreeCrops: `${path}TreeCrops.png`,
  UISprites: `${path}UISprites.png`,
  WildlifeSprites: `${path}Wildlife.png`
}

export default Images
export const {
  BasePlayer,
  CarpentryIcons,
  CarpentryItems,
  Curator,
  ForageableItems,
  Museum,
  NPCs,
  ParticleSprite,
  Plaques,
  Portraits,
  Pregame,
  RainSprite,
  ShortCrops,
  SnowSprite,
  Statues,
  StoreUI,
  TallCrops,
  TileSet,
  TitleBackground,
  Tools,
  TreeCrops,
  UISprites,
  WildlifeSprites
} =  Images