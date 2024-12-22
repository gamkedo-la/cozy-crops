import StoreItemElement from './StoreItemElement.js'
import { StoreUI } from '../globals/Images.js'
import StoreUIData from '../globals/StoreUIData.js'
import EntityTypes from '../globals/EntityTypes.js'

export default class SellItemElement extends StoreItemElement {
  constructor (config) {
    config.sourceImage = config.imageManager.getImageWithSrc(StoreUI)
    config.name = getNameForType(config.type)

    super(config)

    getSourceDataForShopType(this.shopType)
    this.icon = getItemForType(this, config.type)
    this.icon.init()
    this.icon.width = this.itemWidth
    this.icon.height = isTallCrop(config.type) ? 2 * this.itemHeight : this.itemHeight
  }

  getSoldItem () {
    const item = {}
    Object.assign(item, this.icon)
    return item
  }
}

function getNameForType (type) {
  switch (type) {
    case EntityTypes.Carrot:
      return 'Carrot'
    case EntityTypes.Corn:
      return 'Corn'
    case EntityTypes.Eggplant:
      return 'Eggplant'
    case EntityTypes.Lettuce:
      return 'Lettuce'
    case EntityTypes.Onion:
      return 'Onion'
    case EntityTypes.Pepper:
      return 'Pepper'
    case EntityTypes.Potato:
      return 'Potato'
    case EntityTypes.Pumpkin:
      return 'Pumpkin'
    case EntityTypes.Radish:
      return 'Radish'
    case EntityTypes.Strawberry:
      return 'Strawberry'
    case EntityTypes.Tomato:
      return 'Tomato'
    case EntityTypes.Watermelon:
      return 'Watermelon'
    case EntityTypes.Apple:
      return 'Apple'
    case EntityTypes.Orange:
      return 'Orange'
    case EntityTypes.Lime:
      return 'Lime'
    case EntityTypes.Cherry:
      return 'Cherry'
    case EntityTypes.Lemon:
      return 'Lemon'
    case EntityTypes.MapleTree:
      return 'Maple'
    case EntityTypes.Oak:
      return 'Oak'
    case EntityTypes.Pine:
      return 'Pine'
    case EntityTypes.Plum:
      return 'Plum'
  }
}

function getSourceDataForShopType (element, shopType) {
  switch (shopType) {
    case 'store':
      element.sourceX = StoreUIData.StoreItem.x
      element.sourceY = StoreUIData.StoreItem.y
      element.sourceWidth = StoreUIData.StoreItem.width
      element.sourceHeight = StoreUIData.StoreItem.height
      break
    case 'blacksmithshop':
      element.sourceX = StoreUIData.BlacksmithItem.x
      element.sourceY = StoreUIData.BlacksmithItem.y
      element.sourceWidth = StoreUIData.BlacksmithItem.width
      element.sourceHeight = StoreUIData.BlacksmithItem.height
      break
    case 'carpentryshop':
      element.sourceX = StoreUIData.CarpentryItem.x
      element.sourceY = StoreUIData.CarpentryItem.y
      element.sourceWidth = StoreUIData.CarpentryItem.width
      element.sourceHeight = StoreUIData.CarpentryItem.height
      break
  }
}

function getItemForType (element, type) {
  return element.cropManager.getCropForType(type, element.x + element.width - element.itemWidth - 8, element.y + (isTallCrop(type) ? -22 : 8))
}

function isTallCrop (type) {
  return type === EntityTypes.Corn || type === EntityTypes.Eggplant || type === EntityTypes.Pepper || type === EntityTypes.Strawberry
}