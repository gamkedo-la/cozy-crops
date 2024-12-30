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
    if (isTallCrop(config.type)) {
      this.icon.height = 2 * this.itemHeight
    } else if (this.manager.entityManager.isTree({ type: config.type })) {
      this.icon.height = 3 * this.itemHeight
    } else if (this.manager.entityManager.isForageable({ type: config.type })) {
      this.icon.height = this.itemHeight
    }
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
    case EntityTypes.Daffodil:
      return 'Daffodil'
    case EntityTypes.Sunflower:
      return 'Sunflower'
    case EntityTypes.Truffel:
      return 'Truffel'
    case EntityTypes.Tulip:
      return 'Tulip'
    case EntityTypes.WildGarlic:
      return 'Wild Garlic'
    case EntityTypes.WildRose:
      return 'Wild Rose'
    case EntityTypes.AxeCopper:
    case EntityTypes.AxeSteel:
    case EntityTypes.AxeTitanium:
        return 'Axe'
    case EntityTypes.FishingRodBamboo:
    case EntityTypes.FishingRodFiberglass:
    case EntityTypes.FishingRodSteel:
        return 'Fishing Rod'
    case EntityTypes.HoeWooden:
    case EntityTypes.HoeCopper:
    case EntityTypes.HoeSteel:
        return 'Hoe'
    case EntityTypes.ShovelWooden:
    case EntityTypes.ShovelCopper:
    case EntityTypes.ShovelSteel:
        return 'Shovel'
    case EntityTypes.WateringCanWooden:
    case EntityTypes.WateringCanCopper:
    case EntityTypes.WateringCanSteel:
        return 'Watering Can'
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
  if (element.entityManager.isCrop({ type })) {
    return element.cropManager.getCropForType(type, element.x + element.width - element.itemWidth - 8, element.y + (isTallCrop(type) ? -22 : 8))
  } else if (element.entityManager.isTree({ type })) {
    return element.cropManager.getTreeForType(type, element.x + element.width - element.itemWidth - 8, element.y + 8)
  } else if (element.entityManager.isForageable({ type })) {
    return element.cropManager.getForagableForType(type, element.x + element.width - element.itemWidth - 8, element.y + 72)
  } else if (element.entityManager.isTool({ type })) {
    return element.getTool(element, type)
  }
}

function isTallCrop (type) {
  return type === EntityTypes.Corn ||
         type === EntityTypes.Eggplant ||
         type === EntityTypes.Pepper ||
         type === EntityTypes.Strawberry
}