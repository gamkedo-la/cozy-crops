import { UISprites } from '../globals/Images.js'
import UISpriteData from '../globals/UISpriteData.js'
import EntityTypes from '../globals/EntityTypes.js'
import Axe from '../entities/tools/Axe.js'
import FishingRod from '../entities/tools/FishingRod.js'
import Hoe from '../entities/tools/Hoe.js'
import PickAxe from '../entities/tools/Pickaxe.js'
import Shovel from '../entities/tools/Shovel.js'
import WateringCan from '../entities/tools/WateringCan.js'

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
  }

  start () {
    buildInventory(this)

    this.updateInventoryPlacement()
  }

  getInventory () {
    return [...this.inventory]
  }

  setInventory (inventory) {}

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

  getClikedItem (x, y) {
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
  }
}

function buildInventory (inventoryManager) {
  const inventoryData = inventoryManager.gameManager.getInventory()
  for (const inventoryItem of inventoryData) {
    let item = null
    switch (inventoryItem.type) {
      case EntityTypes.AxeCopper:
      case EntityTypes.AxeSteel:
      case EntityTypes.AxeTitanium:
        item = new Axe({
          game: inventoryManager.game,
          imageManager: inventoryManager.imageManager,
          type: inventoryItem.type,
          x: 0,
          y: 0,
          width: inventoryManager.itemWidth,
          height: inventoryManager.itemHeight
        })
        item.init()
        inventoryManager.inventory.push(item)
        break
      case EntityTypes.FishingRodBamboo:
      case EntityTypes.FishingRodFiberglass:
      case EntityTypes.FishingRodSteel:
        item = new FishingRod({
          game: inventoryManager.game,
          imageManager: inventoryManager.imageManager,
          type: inventoryItem.type,
          x: 0,
          y: 0,
          width: inventoryManager.itemWidth,
          height: inventoryManager.itemHeight
        })
        item.init()
        inventoryManager.inventory.push(item)
        break
      case EntityTypes.HoeCopper:
      case EntityTypes.HoeSteel:
      case EntityTypes.HoeWooden:
        item = new Hoe({
          game: inventoryManager.game,
          imageManager: inventoryManager.imageManager,
          type: inventoryItem.type,
          x: 0,
          y: 0,
          width: inventoryManager.itemWidth,
          height: inventoryManager.itemHeight
        })
        item.init()
        inventoryManager.inventory.push(item)
        break
      case EntityTypes.PickaxeCopper:
      case EntityTypes.PickaxeSteel:
      case EntityTypes.PickaxeTitanium:
        item = new PickAxe({
          game: inventoryManager.game,
          imageManager: inventoryManager.imageManager,
          type: inventoryItem.type,
          x: 0,
          y: 0,
          width: inventoryManager.itemWidth,
          height: inventoryManager.itemHeight
        })
        item.init()
        inventoryManager.inventory.push(item)
        break
      case EntityTypes.ShovelCopper:
      case EntityTypes.ShovelSteel:
      case EntityTypes.ShovelWooden:
        item = new Shovel({
          game: inventoryManager.game,
          imageManager: inventoryManager.imageManager,
          type: inventoryItem.type,
          x: 0,
          y: 0,
          width: inventoryManager.itemWidth,
          height: inventoryManager.itemHeight
        })
        item.init()
        inventoryManager.inventory.push(item)
        break
      case EntityTypes.WateringCanCopper:
      case EntityTypes.WateringCanSteel:
      case EntityTypes.WateringCanWooden:
        item = new WateringCan({
          game: inventoryManager.game,
          imageManager: inventoryManager.imageManager,
          type: inventoryItem.type,
          x: 0,
          y: 0,
          width: inventoryManager.itemWidth,
          height: inventoryManager.itemHeight
        })
        item.init()
        inventoryManager.inventory.push(item)
        break    
    }
  }
}
