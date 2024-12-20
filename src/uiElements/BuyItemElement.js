import StoreItemElement from './StoreItemElement.js'
import { StoreUI } from '../globals/Images.js'
import StoreUIData from '../globals/StoreUIData.js'
import EntityTypes from '../globals/EntityTypes.js'
import SeedPacket from '../entities/crops/SeedPacket.js'

export default class BuyItemElement extends StoreItemElement {
  constructor (config) {
    config.sourceImage = config.imageManager.getImageWithSrc(StoreUI)
    config.sourceX = StoreUIData.BuyItem.x
    config.sourceY = StoreUIData.BuyItem.y
    config.sourceWidth = StoreUIData.BuyItem.width
    config.sourceHeight = StoreUIData.BuyItem.height
    config.name = getNameForType(config.type)

    super(config)

    this.icon = getPacketForType(this, config.type)
  }
}

function getNameForType (type) {
  switch (type) {
    case EntityTypes.CarrotSeed:
      return 'Carrot'
    case EntityTypes.CornSeed:
      return 'Corn'
    case EntityTypes.EggplantSeed:
      return 'Eggplant'
    case EntityTypes.LettuceSeed:
      return 'Lettuce'
    case EntityTypes.OnionSeed:
      return 'Onion'
    case EntityTypes.PepperSeed:
      return 'Pepper'
    case EntityTypes.PotatoSeed:
      return 'Potato'
    case EntityTypes.PumpkinSeed:
      return 'Pumpkin'
    case EntityTypes.RadishSeed:
      return 'Radish'
    case EntityTypes.StrawberrySeed:
      return 'Strawberry'
    case EntityTypes.TomatoSeed:
      return 'Tomato'
    case EntityTypes.WatermelonSeed:
      return 'Watermelon'
    case EntityTypes.AppleSeed:
      return 'Apple'
    case EntityTypes.OrangeSeed:
      return 'Orange'
    case EntityTypes.LimeSeed:
      return 'Lime'
    case EntityTypes.CherrySeed:
      return 'Cherry'
    case EntityTypes.LemonSeed:
      return 'Lemon'
    case EntityTypes.MapleSeed:
      return 'Maple'
    case EntityTypes.OakSeed:
      return 'Oak'
    case EntityTypes.PineSeed:
      return 'Pine'
    case EntityTypes.PlumSeed:
      return 'Plum'
  }
}

function getPacketForType (element, type) {
  // Need to account for tall crops being twice as high so they aren't drawn squished
  const height = isTallCropSeed(type) ? element.itemHeight * 2 : element.itemHeight
  const config = {
    game: element.game,
    imageManager: element.imageManager,
    type,
    x: element.x + element.width - element.itemWidth - 8,
    y: element.y + (isTallCropSeed(type) ? 16 - element.itemHeight : 8),
    width: element.itemWidth,
    height: isTallCropSeed(type) ? element.itemHeight * 2 : element.itemHeight,
    quantity: 1
  }

  const packet = new SeedPacket(config)
  packet.init()

  return packet
}

function isTallCropSeed (type) {
  return type === EntityTypes.CornSeed || type === EntityTypes.EggplantSeed || type === EntityTypes.PepperSeed || type === EntityTypes.StrawberrySeed
}