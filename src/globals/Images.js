import { ENV } from './Environment.js'

const path = ENV === 'development' ? '../../img/' : 'img/'

const Images = {
  BasePlayer: `${path}BasePlayer - Copy.png`,
  CarpentryIcons: `${path}CarpentryIcons.png`,
  CarpentryItems: `${path}CarpentryItems.png`,
  CreditsBackgroundBack: `${path}CreditsBackground_back.png`,
  CreditsBackgroundFrame: `${path}CreditsBackground_frame.png`,
  Curator: `${path}Curator.png`,
  Fish: `${path}Fish.png`,
  FishingUI: `${path}FishingUI.png`,
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
  TitleBackground: `${path}menu-bg-sky.png`,
  TitleBackground2: `${path}menu-bg-sunshine.png`,
  TitleBackground3: `${path}menu-bg-field.png`,
  TitleBackground4: `${path}menu-logo.png`,
  TitleBackground5: `${path}menu-bg-field-5.png`,
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
  CreditsBackgroundBack,
  CreditsBackgroundFrame,
  Curator,
  Fish,
  FishingUI,
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
  TitleBackground2,
  TitleBackground3,
  TitleBackground4,
  TitleBackground5,
  Tools,
  TreeCrops,
  UISprites,
  WildlifeSprites
} =  Images