import { UISprites } from '../globals/Images.js'
import UISpriteData from '../globals/UISpriteData.js'
import EntityTypes from '../globals/EntityTypes.js'
import Hoe from '../entities/tools/Hoe.js'
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
    const inventoryData = this.gameManager.getInventory()
    for (const inventoryItem of inventoryData) {
      let item = null
      switch (inventoryItem.type) {
        case EntityTypes.WateringCanWooden:
          item = new WateringCan({
            game: this.game,
            imageManager: this.imageManager,
            type: inventoryItem.type,
            x: 0,
            y: 0,
            width: this.itemWidth,
            height: this.itemHeight
          })
          item.init()
          this.inventory.push(item)
          break
        case EntityTypes.HoeWooden:
          item = new Hoe({
            game: this.game,
            imageManager: this.imageManager,
            type: inventoryItem.type,
            x: 0,
            y: 0,
            width: this.itemWidth,
            height: this.itemHeight
          })
          item.init()
          this.inventory.push(item)
          break
      }
    }

    this.updateInventoryPlacement()
  }

  getInventory () {
    return [...this.inventory]
  }

  setInventory (inventory) {}

  updateInventoryPlacement () {
    this.inventory.forEach((item, index) => {
      item.x = this.x + (index * this.itemWidth) - 2
      item.y = this.y + (Math.floor(index / this.itemsPerRow) * this.itemHeight) - 2
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
