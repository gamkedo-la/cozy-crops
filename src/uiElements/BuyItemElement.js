import StoreItemElement from './StoreItemElement.js'
import { StoreUI } from '../globals/Images.js'
import EntityTypes from '../globals/EntityTypes.js'
import SeedPacket from '../entities/crops/SeedPacket.js'
import Axe from '../entities/tools/Axe.js'
import FishingRod from '../entities/tools/FishingRod.js'
import Hoe from '../entities/tools/Hoe.js'
import Shovel from '../entities/tools/Shovel.js'
import WateringCan from '../entities/tools/WateringCan.js'

export default class BuyItemElement extends StoreItemElement {
  constructor (config) {
    config.sourceImage = config.imageManager.getImageWithSrc(StoreUI)
    config.name = getNameForType(config.type)

    super(config)

    this.disabled = false
    this.icon = getItemForType(this, config.type)
  }

  init () {
    if (this.money < this.price) this.disabled = true

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
  }
}

function getItemForType (element, type) {
  if (element.entityManager.isSeed({ type })) {
    return getSeedPacket(element, type)
  } else if (element.entityManager.isTool({ type })) {
    return getTool(element, type)
  }
}

function getSeedPacket (element, type) {
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

function getTool (element, type) {
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

  let tool = null
  switch (type) {
    case EntityTypes.AxeCopper:
    case EntityTypes.AxeSteel:
    case EntityTypes.AxeTitanium:
      tool = new Axe(config)
      break
    case EntityTypes.FishingRodBamboo:
    case EntityTypes.FishingRodFiberglass:
    case EntityTypes.FishingRodSteel:
      tool = new FishingRod(config)
      break
    case EntityTypes.HoeWooden:
    case EntityTypes.HoeCopper:
    case EntityTypes.HoeSteel:
      tool = new Hoe(config)
      break
    case EntityTypes.ShovelWooden:
    case EntityTypes.ShovelCopper:
    case EntityTypes.ShovelSteel:
      tool = new Shovel(config)
      break
    case EntityTypes.WateringCanWooden:
    case EntityTypes.WateringCanCopper:
    case EntityTypes.WateringCanSteel:
      tool = new WateringCan(config)
      break
  }

  tool.init()

  return tool
}

function isTallCropSeed (type) {
  return type === EntityTypes.CornSeed || type === EntityTypes.EggplantSeed || type === EntityTypes.PepperSeed || type === EntityTypes.StrawberrySeed
}