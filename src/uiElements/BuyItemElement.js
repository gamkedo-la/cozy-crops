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
    case EntityTypes.LettuceSeed:
      return 'Lettuce Seed'
  }
}

function getPacketForType (element, type) {
  let packet = null
  const config = {
    game: element.game,
    imageManager: element.imageManager,
    type,
    x: element.x + element.width - element.itemWidth - 8,
    y: element.y + 8,
    width: element.itemWidth,
    height: element.itemHeight,
    quantity: 1
  }

  switch (type) {
    case EntityTypes.LettuceSeed:
      packet = new SeedPacket(config)
      break
  }

  packet.init()
  return packet
}