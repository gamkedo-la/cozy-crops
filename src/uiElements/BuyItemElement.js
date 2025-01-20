import StoreItemElement from './StoreItemElement.js'
import { StoreUI } from '../globals/Images.js'
import EntityTypes from '../globals/EntityTypes.js'
import SeedPacket from '../entities/crops/SeedPacket.js'

export default class BuyItemElement extends StoreItemElement {
  constructor (config) {
    config.sourceImage = config.imageManager.getImageWithSrc(StoreUI)
    config.name = getNameForType(config.type)

    super(config)

    this.disabled = false
    this.icon = getItemForType(this, config.type)
  }

  init () {
    if (this.shopType === 'carpentryshop') {
      if (this.wood < this.price) this.disabled = true
    } else {
      if (this.money < this.price) this.disabled = true
    }

    super.init()
  }

  getPurchasedItem () {
    return getItemForType(this, this.type)
  }

  draw () {
    if (this.disabled) {
      this.game.ctx.globalAlpha = 0.5
    }

    super.draw()

    if (this.disabled) {
      this.game.ctx.globalAlpha = 1
    }
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
    case EntityTypes.AxeCopper:
      return 'Axe'
    case EntityTypes.AxeSteel:
      return 'Axe'
    case EntityTypes.AxeTitanium:
      return 'Axe'
    case EntityTypes.FishingRodBamboo:
      return 'Fishing Rod'
    case EntityTypes.FishingRodFiberglass:
      return 'Fishing Rod'
    case EntityTypes.FishingRodSteel:
      return 'Rod'
    case EntityTypes.HoeWooden:
      return 'Hoe'
    case EntityTypes.HoeSteel:
      return 'Hoe'
    case EntityTypes.HoeCopper:
      return 'Hoe'
    case EntityTypes.ShovelWooden:
      return 'Shovel'
    case EntityTypes.ShovelSteel:
      return 'Shovel'
    case EntityTypes.ShovelCopper:
      return 'Shovel'
    case EntityTypes.WateringCanWooden:
      return 'Watering Can'
    case EntityTypes.WateringCanSteel:
      return 'Watering Can'
    case EntityTypes.WateringCanCopper:
      return 'Watering Can'
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

function getItemForType (element, type) {
  if (element.entityManager.isSeed({ type })) {
    return getSeedPacket(element, type)
  } else if (element.entityManager.isTool({ type })) {
    return element.getTool(element, type)
  } else if (element.entityManager.isFurniture({ type })) {
    return element.getFurniture(element, type)
  }
}

function getSeedPacket (element, type) {
  const config = {
    game: element.game,
    imageManager: element.imageManager,
    type,
    x: element.x + element.width - element.itemWidth - (isTreeSeed(type) ? 28 : 8),
    y: element.y + (isTreeSeed(type) ? 28 - element.itemHeight : isTallCropSeed(type) ? 16 - element.itemHeight : 8),
    width: isTreeSeed(type) ? 2 * element.itemWidth : element.itemWidth,
    height: isTallCropSeed(type) || isTreeSeed(type) ? element.itemHeight * 2 : element.itemHeight,
    quantity: 1
  }

  const packet = new SeedPacket(config)
  packet.init()

  return packet
}

function isTallCropSeed (type) {
  return type === EntityTypes.CornSeed || type === EntityTypes.EggplantSeed || type === EntityTypes.PepperSeed || type === EntityTypes.StrawberrySeed
}

function isTreeSeed (type) {
  return type === EntityTypes.AppleSeed ||
  type === EntityTypes.OrangeSeed ||
  type === EntityTypes.LimeSeed ||
  type === EntityTypes.CherrySeed ||
  type === EntityTypes.LemonSeed ||
  type === EntityTypes.MapleSeed ||
  type === EntityTypes.OakSeed ||
  type === EntityTypes.PineSeed ||
  type === EntityTypes.PlumSeed
}