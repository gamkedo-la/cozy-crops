import StoreItemElement from './StoreItemElement.js'
import { StoreUI } from '../globals/Images.js'
import StoreUIData from '../globals/StoreUIData.js'
import EntityTypes from '../globals/EntityTypes.js'
import SeedPacket from '../entities/crops/SeedPacket.js'
import Fruit from '../entities/crops/Fruit.js'
import Wood from '../entities/crops/Wood.js'
import Furniture from '../entities/furniture/Furniture.js'

export default class SellItemElement extends StoreItemElement {
  constructor (config) {
    config.sourceImage = config.imageManager.getImageWithSrc(StoreUI)
    config.name = getNameForType(config.type)

    super(config)

    getSourceDataForShopType(this.shopType)
    if (this.manager.entityManager.isFish({ type: config.type })) {
      //TODO: Temporarily disabled until fish are fully implemented
      return
    }
    this.icon = getItemForType(this, config.type)
    this.icon.init()
    this.icon.width = this.itemWidth
    if (this.manager.entityManager.isTallCrop({ type: config.type })) {
      this.icon.height = 2 * this.itemHeight
    } else if (this.manager.entityManager.isCrop({ type: config.type })) {
      this.icon.height = this.itemHeight
    } else if (this.manager.entityManager.isTree({ type: config.type })) {
      this.icon.height = 3 * this.itemHeight
    } else if (this.manager.entityManager.isForageable({ type: config.type })) {
      this.icon.height = this.itemHeight
    } else if (this.manager.entityManager.isFurniture({ type: config.type })) {
      this.icon.height = this.itemHeight
      this.icon.x += this.itemWidth / 2
      this.icon.y += this.itemHeight / 2
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
    case EntityTypes.CarrotSeed:
      return 'Carrot Seed'
    case EntityTypes.Corn:
      return 'Corn'
    case EntityTypes.CornSeed:
      return 'Corn Seed'
    case EntityTypes.Eggplant:
      return 'Eggplant'
    case EntityTypes.EggplantSeed:
      return 'Eggplant Seed'
    case EntityTypes.Lettuce:
      return 'Lettuce'
    case EntityTypes.LettuceSeed:
      return 'Lettuce Seed'
    case EntityTypes.Onion:
      return 'Onion'
    case EntityTypes.OnionSeed:
      return 'Onion Seed'
    case EntityTypes.Pepper:
      return 'Pepper'
    case EntityTypes.PepperSeed:
      return 'Pepper Seed'
    case EntityTypes.Potato:
      return 'Potato'
    case EntityTypes.PotatoSeed:
      return 'Potato Seed'
    case EntityTypes.Pumpkin:
      return 'Pumpkin'
    case EntityTypes.PumpkinSeed:
      return 'Pumpkin Seed'
    case EntityTypes.Radish:
      return 'Radish'
    case EntityTypes.RadishSeed:
      return 'Radish Seed'
    case EntityTypes.Strawberry:
      return 'Strawberry'
    case EntityTypes.StrawberrySeed:
      return 'Strawberry Seed'
    case EntityTypes.Tomato:
      return 'Tomato'
    case EntityTypes.TomatoSeed:
      return 'Tomato Seed'
    case EntityTypes.Watermelon:
      return 'Watermelon'
    case EntityTypes.WatermelonSeed:
      return 'Watermelon Seed'
    case EntityTypes.Apple:
      return 'Apple'
    case EntityTypes.AppleSeed:
      return 'Apple Seed'
    case EntityTypes.Orange:
      return 'Orange'
    case EntityTypes.OrangeSeed:
      return 'Orange Seed'
    case EntityTypes.Lime:
      return 'Lime'
    case EntityTypes.LimeSeed:
      return 'Lime Seed'
    case EntityTypes.Cherry:
      return 'Cherry'
    case EntityTypes.CherrySeed:
      return 'Cherry Seed'
    case EntityTypes.Lemon:
      return 'Lemon'
    case EntityTypes.LemonSeed:
      return 'Lemon Seed'
    case EntityTypes.MapleTree:
      return 'Maple'
    case EntityTypes.MapleSeed:
      return 'Maple Seed'
    case EntityTypes.Oak:
      return 'Oak'
    case EntityTypes.OakSeed:
      return 'Oak Seed'
    case EntityTypes.Pine:
      return 'Pine'
    case EntityTypes.PineSeed:
      return 'Pine Seed'
    case EntityTypes.Plum:
      return 'Plum'
    case EntityTypes.PlumSeed:
      return 'Plum Seed'
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
    case EntityTypes.AppleWood:
      return 'Apple Wood'
    case EntityTypes.OrangeWood:
      return 'Orange Wood'
    case EntityTypes.LimeWood:
      return 'Lime Wood'
    case EntityTypes.CherryWood:
      return 'Cherry Wood'
    case EntityTypes.LemonWood:
      return 'Lemon Wood'
    case EntityTypes.MapleWood:
      return 'Maple Wood'
    case EntityTypes.OakWood:
      return 'Oak Wood'
    case EntityTypes.PineWood:
      return 'Pine Wood'
    case EntityTypes.PlumWood:
      return 'Plum Wood'
    case EntityTypes.BedTwin:
      return 'Twin Bed'
    case EntityTypes.BedQueen:
      return 'Queen Bed'
    case EntityTypes.FireplaceBrick:
      return 'Fireplace'
    case EntityTypes.FireplaceStone:
      return 'Fireplace'
    case EntityTypes.LowerCabinetBrown:
      return 'Cabinet'
    case EntityTypes.LowerCabinetWhite:
      return 'Cabinet'
    case EntityTypes.RefrigeratorGray:
      return 'Refrigerator'
    case EntityTypes.RefrigeratorSilver:
      return 'Refrigerator'
    case EntityTypes.SleepingBag2:
      return 'Sleeping Bag'
    case EntityTypes.StoveGray:
      return 'Stove'
    case EntityTypes.StoveWhite:
      return 'Stove'
    case EntityTypes.UpperCabinetBrown:
      return 'Cupboard'
    case EntityTypes.UpperCabinetGray:
      return 'Cupboard'
    case EntityTypes.WallPaperGray:
      return 'Gray'
    case EntityTypes.FlooringPurple:
      return 'Carpet'
    case EntityTypes.WallPaperAuburn:
      return 'Red'
    case EntityTypes.WallPaperStriped:
      return 'Striped'
    case EntityTypes.WallPaperTan:
      return 'Tan'
    case EntityTypes.FlooringWood:
      return 'Wood'
    case EntityTypes.FlooringHerringbone:
      return 'Herringbone'
    case EntityTypes.FlooringCrosshatch:
      return 'Crosshatch'
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
    case 'gift':
      element.sourceX = StoreUIData.GiftItem.x
      element.sourceY = StoreUIData.GiftItem.y
      element.sourceWidth = StoreUIData.GiftItem.width
      element.sourceHeight = StoreUIData.GiftItem.height
      break
  }
}

function getItemForType (element, type) {
  if (element.entityManager.isSeed({ type })) {
    return getSeedPacketForType(element, type, element.x + element.width - element.itemWidth - 8, element.y + 8)
  } if (element.entityManager.isCrop({ type })) {
    return element.cropManager.getCropForType(type, element.x + element.width - element.itemWidth - 8, element.y + (isTallCrop(type) ? -22 : 8))
  } else if (element.entityManager.isTree({ type })) {
    return element.cropManager.getTreeForType(type, element.x + element.width - element.itemWidth - 8, element.y + 8)
  } else if (element.entityManager.isForageable({ type })) {
    return element.cropManager.getForagableForType(type, element.x + element.width - element.itemWidth - 8, element.y + 76)
  } else if (element.entityManager.isTool({ type })) {
    return element.getTool(element, type)
  } else if (element.entityManager.isTreeFruit({ type })) {
    return getFruitForType(element, type)
  } else if (element.entityManager.isWood({ type })) {
    return getWoodForType(element, type)
  } else if (element.entityManager.isFurniture({ type })) {
    return getFurnitureForType(element, type)
  }
}

function isTallCrop (type) {
  return type === EntityTypes.Corn ||
         type === EntityTypes.Eggplant ||
         type === EntityTypes.Pepper ||
         type === EntityTypes.Strawberry
}

function getSeedPacketForType (manager, type, x, y) {
    const config = {
      game: manager.game,
      imageManager: manager.imageManager,
      type,
      x,
      y,
      width: manager.inventoryManager.itemWidth,
      height: manager.inventoryManager.itemHeight,
      quantity: 1
    }
  
    const item = new SeedPacket(config)
    item.init()

    return item
}

function getFruitForType (manager, type) {
  const fruit = new Fruit({
    game: manager.game,
    imageManager: manager.imageManager,
    type: fruitTypeForTreeType(type),
    x: manager.x + manager.width - manager.itemWidth - 28,
    y: manager.y + 28 - manager.itemHeight,
    width: 2 * manager.itemWidth,
    height: 2 * manager.itemHeight,
    quantity: 1
  })
  fruit.init()

  return fruit
}

function getWoodForType (manager, type) {
  const wood = new Wood({
    game: manager.game,
    imageManager: manager.imageManager,
    type,
    x: manager.x + manager.width - manager.itemWidth - 28,
    y: manager.y + 28 - manager.itemHeight,
    width: 2 * manager.itemWidth,
    height: 2 * manager.itemHeight,
    quantity: 1
  })
  wood.init()

  return wood
}

function getFurnitureForType (manager, type) {
  const config = {
    game: manager.game,
    imageManager: manager.imageManager,
    type,
    x: manager.x + manager.width - manager.itemWidth - 28,
    y: manager.y + 28 - manager.itemHeight,
    width: 2 * manager.itemWidth,
    height: 2 * manager.itemHeight,
    quantity: 1
  }

  const item = new Furniture(config)
  item.init()

  return item
}

function fruitTypeForTreeType (tree) {
  switch (tree.type) {
    case EntityTypes.AppleTree:
      return EntityTypes.Apple
    case EntityTypes.OrangeTree:
      return EntityTypes.Orange
    case EntityTypes.LimeTree:
      return EntityTypes.Lime
    case EntityTypes.CherryTree:
      return EntityTypes.Cherry
    case EntityTypes.LemonTree:
      return EntityTypes.Lemon
    case EntityTypes.PlumTree:
      return EntityTypes.Plum
  }
}