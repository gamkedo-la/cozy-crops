import { UISprites } from '../globals/Images.js'
import UISpriteData from '../globals/UISpriteData.js'
import EntityTypes from '../globals/EntityTypes.js'
import SelectedInventoryHighlight from '../uiElements/SelectedInventoryHighlight.js'
import Axe from '../entities/tools/Axe.js'
import FishingRod from '../entities/tools/FishingRod.js'
import Hoe from '../entities/tools/Hoe.js'
import PickAxe from '../entities/tools/Pickaxe.js'
import Shovel from '../entities/tools/Shovel.js'
import WateringCan from '../entities/tools/WateringCan.js'
import SeedPacket from '../entities/crops/SeedPacket.js'
import Daffodil from '../entities/forageables/Daffodil.js'
import Sunflower from '../entities/forageables/Sunflower.js'
import Truffel from '../entities/forageables/Truffel.js'
import Tulip from '../entities/forageables/Tulip.js'
import WildGarlic from '../entities/forageables/WildGarlic.js'
import WildRose from '../entities/forageables/WildRose.js'

export default class InventoryManager {
  constructor(config) {
    Object.assign(this, config)

    this.inventory = []

    this.itemWidth = 40
    this.itemHeight = 40
    this.itemsPerRow = 10

    this.x = (this.game.canvas.width / 2) - (this.itemWidth * this.itemsPerRow / 2)
    this.y = this.game.canvas.height - this.itemHeight - 13
    this.width = this.itemWidth * this.itemsPerRow
    this.height = this.itemHeight

    this.selectedItem = null
    this.selectedItemHighlight = null
  }

  start () {
    buildInventory(this)

    this.updateInventoryPlacement()

    this.selectedItemHighlight = new SelectedInventoryHighlight({
      game: this.game,
      imageManager: this.imageManager,
      x: 0,
      y: 0,
      width: this.itemWidth,
      height: this.itemHeight
    })
  }

  getInventory () {
    return [...this.inventory]
  }

  setInventory (inventory) {}

  addItemToInventory (itemType, quantity = 1) {
    let item = null

    switch (itemType) {
      case EntityTypes.AxeCopper:
      case EntityTypes.AxeSteel:
      case EntityTypes.AxeTitanium:
        item = new Axe({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.FishingRodBamboo:
      case EntityTypes.FishingRodFiberglass:
      case EntityTypes.FishingRodSteel:
        item = new FishingRod({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.HoeCopper:
      case EntityTypes.HoeSteel:
      case EntityTypes.HoeWooden:
        item = new Hoe({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.PickaxeCopper:
      case EntityTypes.PickaxeSteel:
      case EntityTypes.PickaxeTitanium:
        item = new PickAxe({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.ShovelCopper:
      case EntityTypes.ShovelSteel:
      case EntityTypes.ShovelWooden:
        item = new Shovel({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.WateringCanCopper:
      case EntityTypes.WateringCanSteel:
      case EntityTypes.WateringCanWooden:
        item = new WateringCan({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.CarrotSeed:
      case EntityTypes.CornSeed:
      case EntityTypes.LettuceSeed:
      case EntityTypes.OnionSeed:
        item = new SeedPacket({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.Daffodil:
        item = new Daffodil({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.Sunflower:
        item = new Sunflower({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.Truffel:
        item = new Truffel({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.Tulip:
        item = new Tulip({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.WildGarlic:
        item = new WildGarlic({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
      case EntityTypes.WildRose:
        item = new WildRose({
          game: this.game,
          imageManager: this.imageManager,
          type: itemType,
          x: 0,
          y: 0,
          width: this.itemWidth,
          height: this.itemHeight,
          quantity
        })
        item.init()
        this.inventory.push(item)
        break
    }

    this.updateInventoryPlacement()
  }

  updateInventoryPlacement () {
    this.inventory.forEach((item, index) => {
      item.x = this.x + (index * this.itemWidth)
      item.y = this.y + (Math.floor(index / this.itemsPerRow) * this.itemHeight)
    })
  }

  getTools () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isTool(item))
  }

  getSeeds () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isSeed(item))
  }

  getForagables () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isForageable(item))
  }

  getClickedItem (x, y) {
    const clickedItem = this.inventory.find(item => {
      return (
        x >= item.x &&
        x <= item.x + item.width &&
        y >= item.y &&
        y <= item.y + item.height
      )
    })
    return clickedItem
  }

  setSelectedItem (item) {
    this.selectedItem = item
  }

  draw () {
    this.game.ctx.drawImage(this.imageManager.getImageWithSrc(UISprites), UISpriteData.InventoryIcons.x, UISpriteData.InventoryIcons.y, UISpriteData.InventoryIcons.width, UISpriteData.InventoryIcons.height, this.x, this.y, 2 * UISpriteData.InventoryIcons.width, 2 * UISpriteData.InventoryIcons.height)
  
    this.getTools().forEach((tool, index) => {
      tool.drawAsInventory(
        tool.x,
        tool.y,
        this.itemWidth,
        this.itemHeight
      )
    })

    this.getSeeds().forEach((seed, index) => {
      seed.drawAsInventory(
        seed.x,
        seed.y,
        this.itemWidth,
        this.itemHeight
      )
    })

    this.getForagables().forEach((foragable, index) => {
      foragable.drawAsInventory(
        foragable.x,
        foragable.y,
        this.itemWidth,
        this.itemHeight
      )
    })

    if (this.selectedItem) {
      this.selectedItemHighlight.draw(this.selectedItem.x, this.selectedItem.y)
    }
  }
}

function buildInventory (inventoryManager) {
  const inventoryData = inventoryManager.gameManager.getInventory()
  for (const inventoryItem of inventoryData) {
    inventoryManager.addItemToInventory(inventoryItem.type, inventoryItem.quantity)
  }
}
