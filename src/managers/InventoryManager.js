import { UISprites } from '../globals/Images.js'
import UISpriteData from '../globals/UISpriteData.js'
import EntityTypes from '../globals/EntityTypes.js'
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
            y: 0
          })
          item.init()
          this.inventory.push(item)
          break
      }
    }
  }

  getInventory () {
    return [...this.inventory]
  }

  getTools () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isTool(item))
  }

  getSeeds () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isSeed(item))
  }

  draw () {
    this.game.ctx.drawImage(this.imageManager.getImageWithSrc(UISprites), UISpriteData.InventoryIcons.x, UISpriteData.InventoryIcons.y, UISpriteData.InventoryIcons.width, UISpriteData.InventoryIcons.height, this.x, this.y, 2 * UISpriteData.InventoryIcons.width, 2 * UISpriteData.InventoryIcons.height)
  
    this.getTools().forEach((tool, index) => {
      tool.drawAsInventory(
        this.x + (index * this.itemWidth) - 4,
        this.y + (Math.floor(index / this.itemsPerRow) * this.itemHeight) - 4,
        this.itemWidth,
        this.itemHeight
      )
    })
  }
}
