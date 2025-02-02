import { UISprites } from '../globals/Images.js'
import UISpriteData from '../globals/UISpriteData.js'
import EntityTypes from '../globals/EntityTypes.js'
import SelectedInventoryHighlight from '../uiElements/SelectedInventoryHighlight.js'
// import Tools
import Axe from '../entities/tools/Axe.js'
import FishingRod from '../entities/tools/FishingRod.js'
import Hoe from '../entities/tools/Hoe.js'
import Shovel from '../entities/tools/Shovel.js'
import WateringCan from '../entities/tools/WateringCan.js'
// import Seeds
import SeedPacket from '../entities/crops/SeedPacket.js'
// import Forageables
import Daffodil from '../entities/forageables/Daffodil.js'
import Sunflower from '../entities/forageables/Sunflower.js'
import Truffel from '../entities/forageables/Truffel.js'
import Tulip from '../entities/forageables/Tulip.js'
import WildGarlic from '../entities/forageables/WildGarlic.js'
import WildRose from '../entities/forageables/WildRose.js'

// import Crops
import Fruit from '../entities/crops/Fruit.js'
import Carrot from '../entities/crops/Carrot.js'
import Corn from '../entities/crops/Corn.js'
import Eggplant from '../entities/crops/Eggplant.js'
import Lettuce from '../entities/crops/Lettuce.js'
// import Maple from '../entities/crops/Maple.js'
// import Oak from '../entities/crops/Oak.js'
import Onion from '../entities/crops/Onion.js'
import Pepper from '../entities/crops/Pepper.js'
// import Pine from '../entities/crops/Pine.js'
import Potato from '../entities/crops/Potato.js'
import Pumpkin from '../entities/crops/Pumpkin.js'
import Radish from '../entities/crops/Radish.js'
import Strawberry from '../entities/crops/Strawberry.js'
import Tomato from '../entities/crops/Tomato.js'
import Watermelon from '../entities/crops/Watermelon.js'
import Wood from '../entities/crops/Wood.js'
import Furniture from '../entities/furniture/Furniture.js'
import Fish from '../entities/fish/Fish.js'

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

  start (scene) {
    buildInventory(this, scene)

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

  addItemToInventory (itemToAdd, quantity = 1) {
    // TODO: We'll need to handle finding the item in the inventory and updating the quantity...
    let item = null

    if (this.entityManager.isSeed(itemToAdd) ||
        this.entityManager.isCrop(itemToAdd) ||
        this.entityManager.isForageable(itemToAdd) ||
        this.entityManager.isTool(itemToAdd) ||
        this.entityManager.isWood(itemToAdd) ||
        this.entityManager.isFurniture(itemToAdd) ||
        this.entityManager.isFish(itemToAdd)) {
      let item = this.getItem(itemToAdd.type)
      if (item) {
        item.quantity += quantity
      } else {
        itemToAdd.quantity = quantity
        this.inventory.push(itemToAdd)
        item = itemToAdd
      }
    }

    this.updateInventoryPlacement()
    this.game.gameManager.addToInventory(itemToAdd.type, quantity)
  }

  getItem (itemType) {
    return this.inventory.find(item => item.type === itemType)
  }

  removeItemFromInventory (itemToRemove, quantity = 1) {
    let item = null

    if (this.entityManager.isSeed(itemToRemove) ||
        this.entityManager.isCrop(itemToRemove) ||
        this.entityManager.isForageable(itemToRemove) ||
        this.entityManager.isTool(itemToRemove) ||
        this.entityManager.isWood(itemToRemove) ||
        this.entityManager.isFurniture(itemToRemove) ||
        this.entityManager.isFish(itemToRemove)) {
      let item = this.getItem(itemToRemove.type)
      if (item) {
        item.quantity -= quantity
        if (item.quantity <= 0) {
          const index = this.inventory.findIndex(item => item.type === itemToRemove.type)
          if (index >= 0) {
            item = this.inventory[index]
            this.inventory.splice(index, 1)
          }
        }
      }
    }

    this.updateInventoryPlacement()
    this.game.gameManager.removeFromInventory(itemToRemove.type, quantity)
  }

  updateInventoryPlacement () {
    this.inventory.forEach((item, index) => {
      item.x = this.x + (index * this.itemWidth)
      item.y = this.y + (Math.floor(index / this.itemsPerRow) * this.itemHeight)
    })
  }

  getQuantity (item) {
    const inventoryItem = this.inventory.find(inventoryItem => inventoryItem.type === item.type)
    return inventoryItem ? inventoryItem.quantity : 0
  }

  getTools () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isTool(item))
  }

  getBaseTools () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isBaseTool(item))
  }

  getUpgradedTools () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isUpgradedTool(item))
  }

  getPremiumTools () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isPremiumTool(item))
  }

  getBaseFurniture () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isBaseFurniture(item))
  }

  getUpgradedFurniture () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isUpgradedFurniture(item))
  }

  getWallpaper () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isWallpaper(item))
  }

  getFlooring () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isFlooring(item))
  }

  getSeeds () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isSeed(item))
  }

  getForagables () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isForageable(item))
  }

  getCrops (strict = false) {
    const inventory = this.getInventory()
    if (strict) {
      return inventory.filter(item => this.entityManager.isCrop(item) && !this.entityManager.isTreeFruit(item))
    }

    return inventory.filter(item => this.entityManager.isCrop(item))
  }

  getWood () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isWood(item))
  }

  getFish () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isFish(item))
  }

  getTreeFruit () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isTreeFruit(item))
  }

  getClickedItem (x, y) {
    const clickedItem = this.inventory.find(item => {
      return (
        x >= item.x &&
        x <= item.x + this.itemWidth &&
        y >= item.y &&
        y <= item.y + this.itemHeight
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
      if (this.entityManager.isTallCropSeed(seed)) {
        seed.drawAsInventory(
          seed.x,
          seed.y - (3 * this.itemHeight / 4) - 1,
          this.itemWidth,
          2 * this.itemHeight
        )
      } else if (this.entityManager.isTreeSeed(seed)) {
        seed.drawAsInventory(
          seed.x - (this.itemWidth / 2),
          seed.y - (this.itemHeight / 2),
          2 * this.itemWidth,
          2 * this.itemHeight
        )
      } else {
        seed.drawAsInventory(
          seed.x,
          seed.y,
          this.itemWidth,
          this.itemHeight
        )
      }
      drawQuantity(this.game.ctx, seed.x, seed.y, seed.quantity, this.itemWidth, this.itemHeight)
    })

    this.getForagables().forEach((foragable, index) => {
      foragable.drawAsInventory(
        foragable.x,
        foragable.y,
        this.itemWidth,
        this.itemHeight
      )
      drawQuantity(this.game.ctx, foragable.x, foragable.y, foragable.quantity, this.itemWidth, this.itemHeight)
    })

    this.getCrops().forEach((crop, index) => {
      if (this.entityManager.isTallCrop(crop)) {
        crop.drawAsInventory(
          crop.x,
          crop.y - (3 * this.itemHeight / 4) - 1,
          this.itemWidth,
          2 * this.itemHeight
        )
      } else if (this.entityManager.isTreeFruit(crop)) {
        crop.drawAsInventory(
          crop.x - (this.itemWidth / 2),
          crop.y - (this.itemHeight / 2),
          2 * this.itemWidth,
          2 * this.itemHeight
        )
      } else {
        crop.drawAsInventory(
          crop.x,
          crop.y,
          this.itemWidth,
          this.itemHeight
        )  
      }

      drawQuantity(this.game.ctx, crop.x, crop.y, crop.quantity, this.itemWidth, this.itemHeight)
    })

    this.getWood().forEach((wood, index) => {
      wood.drawAsInventory(
        wood.x - this.itemWidth / 2,
        wood.y - (5 * this.itemHeight / 4) + 2,
        2 * this.itemWidth,
        2 * this.itemHeight
      )
      drawQuantity(this.game.ctx, wood.x, wood.y, wood.quantity, this.itemWidth, this.itemHeight)
    })

    this.getFish().forEach((fish, index) => {
      fish.drawAsInventory(
        fish.x,
        fish.y - 1,
        this.itemWidth,
        this.itemHeight
      )
      drawQuantity(this.game.ctx, fish.x, fish.y, fish.quantity, this.itemWidth, this.itemHeight)
    })

    // Don't draw furniture or wallpaper

    if (this.selectedItem) {
      this.selectedItemHighlight.draw(this.selectedItem.x, this.selectedItem.y)
    }
  }
}

function buildInventory (inventoryManager, scene) {
  const inventoryData = inventoryManager.gameManager.getInventory()
  for (const inventoryItem of inventoryData) {
    initializeInventory(inventoryManager, scene, inventoryItem, inventoryItem.quantity)
  }
}

function initializeInventory (manager, scene, itemToAdd, quantity = 1) {
  if (manager.entityManager.isSeed(itemToAdd)) {
    initializeSeedPackets(manager, scene, itemToAdd, quantity)
  } else if (manager.entityManager.isTool(itemToAdd)) {
    initializeTools(manager, scene, itemToAdd, quantity)
  } else if (manager.entityManager.isForageable(itemToAdd)) {
    initializeForageables(manager, scene, itemToAdd, quantity)
  } else if (manager.entityManager.isCrop(itemToAdd)) {
    initializeCrops(manager, scene, itemToAdd, quantity)
  } else if (manager.entityManager.isWood(itemToAdd)) {
    initializeWood(manager, scene, itemToAdd, quantity)
  } else if (manager.entityManager.isFurniture(itemToAdd)) {
    initializeFurniture(manager, scene, itemToAdd, quantity)
  } else if (manager.entityManager.isFish(itemToAdd)) {
    initializeFish(manager, scene, itemToAdd, quantity)
  }
}

function initializeSeedPackets (manager, scene, itemToAdd, quantity = 1) {
  let item  = null
  const config = {
    game: manager.game,
    scene,
    imageManager: manager.imageManager,
    type: itemToAdd.type,
    x: 0,
    y: 0,
    width: manager.itemWidth,
    height: manager.itemHeight,
    quantity
  }

  if (manager.entityManager.isSeed(itemToAdd)) {
    item = new SeedPacket(config)
  }

  item.init()
  manager.inventory.push(item)
}

function initializeTools (manager, scene, itemToAdd, quantity = 1) {
  let item  = null
  const config = {
    game: manager.game,
    scene,
    imageManager: manager.imageManager,
    type: itemToAdd.type,
    x: 0,
    y: 0,
    width: manager.itemWidth,
    height: manager.itemHeight,
    quantity
  }

  switch (itemToAdd.type) {
    case EntityTypes.AxeCopper:
    case EntityTypes.AxeSteel:
    case EntityTypes.AxeTitanium:
      item = new Axe(config)
      break
    case EntityTypes.FishingRodBamboo:
    case EntityTypes.FishingRodFiberglass:
    case EntityTypes.FishingRodSteel:
      item = new FishingRod(config)
      break
    case EntityTypes.HoeCopper:
    case EntityTypes.HoeSteel:
    case EntityTypes.HoeWooden:
      item = new Hoe(config)
      break
    case EntityTypes.ShovelCopper:
    case EntityTypes.ShovelSteel:
    case EntityTypes.ShovelWooden:
      item = new Shovel(config)
      break
    case EntityTypes.WateringCanCopper:
    case EntityTypes.WateringCanSteel:
    case EntityTypes.WateringCanWooden:
      item = new WateringCan(config)
      break
  }

  item.init()
  manager.inventory.push(item)
}

function initializeForageables (manager, scene, itemToAdd, quantity = 1) {
  let item  = null
  const config = {
    game: manager.game,
    scene,
    imageManager: manager.imageManager,
    type: itemToAdd.type,
    x: 0,
    y: 0,
    width: manager.itemWidth,
    height: manager.itemHeight,
    quantity
  }

  switch (itemToAdd.type) {
    case EntityTypes.Daffodil:
      item = new Daffodil(config)
      break
    case EntityTypes.Sunflower:
      item = new Sunflower(config)
      break
    case EntityTypes.Truffel:
      item = new Truffel(config)
      break
    case EntityTypes.Tulip:
      item = new Tulip(config)
      break
    case EntityTypes.WildGarlic:
      item = new WildGarlic(config)
      break
    case EntityTypes.WildRose:
      item = new WildRose(config)
      break
  }

  item.init()
  manager.inventory.push(item)
}

function initializeCrops (manager, scene, itemToAdd, quantity = 1) {
  let item  = null

  const config = {
    game: manager.game,
    imageManager: manager.imageManager,
    scene,
    type: itemToAdd.type,
    x: 0,
    y: 0,
    width: manager.itemWidth,
    height: manager.itemHeight,
    quantity
  }

  switch (itemToAdd.type) {
    case EntityTypes.Apple:
    case EntityTypes.Cherry:
    case EntityTypes.Lemon:
    case EntityTypes.Lime:
    case EntityTypes.Orange:
    case EntityTypes.Plum:
      item = new Fruit(config)
      break
    case EntityTypes.Carrot:
      item = new Carrot(config)
      break
    case EntityTypes.Corn:
      item = new Corn(config)
      break
    case EntityTypes.Eggplant:
      item = new Eggplant(config)
      break
    case EntityTypes.Lettuce:
      item = new Lettuce(config)
      break
    case EntityTypes.Maple:
      item = new Maple(config)
      break
    case EntityTypes.Oak:
      item = new Oak(config)
      break
    case EntityTypes.Onion:
      item = new Onion(config)
      break
    case EntityTypes.Pepper:
      item = new Pepper(config)
      break
    case EntityTypes.Pine:
      item = new Pine(config)
      break
    case EntityTypes.Potato:
      item = new Potato(config)
      break
    case EntityTypes.Pumpkin:
      item = new Pumpkin(config)
      break
    case EntityTypes.Radish:
      item = new Radish(config)
      break
    case EntityTypes.Strawberry:
      item = new Strawberry(config)
      break
    case EntityTypes.Tomato:
      item = new Tomato(config)
      break
    case EntityTypes.Watermelon:
      item = new Watermelon(config)
      break
  }

  item.init()
  manager.inventory.push(item)
}

function initializeWood (manager, scene, itemToAdd, quantity = 1) {
  let item  = null

  const config = {
    game: manager.game,
    scene,
    imageManager: manager.imageManager,
    type: itemToAdd.type,
    x: 0,
    y: 0,
    width: manager.itemWidth,
    height: manager.itemHeight,
    quantity
  }

  if (manager.entityManager.isWood(itemToAdd)) {
    item = new Wood(config)
  }

  item.init()
  manager.inventory.push(item)
}

function initializeFurniture (manager, scene, itemToAdd, quantity = 1) {
  let item  = null

  const config = {
    game: manager.game,
    scene,
    imageManager: manager.imageManager,
    type: itemToAdd.type,
    x: 0,
    y: 0,
    width: manager.itemWidth,
    height: manager.itemHeight,
    quantity
  }

  if (manager.entityManager.isFurniture(itemToAdd)) {
    item = new Furniture(config)
  }

  item.init()
  manager.inventory.push(item)
}

function initializeFish (manager, scene, itemToAdd, quantity = 1) {
  let item  = null

  const config = {
    game: manager.game,
    scene,
    imageManager: manager.imageManager,
    type: itemToAdd.type,
    x: 0,
    y: 0,
    width: manager.itemWidth,
    height: manager.itemHeight,
    quantity
  }

  if (manager.entityManager.isFish(itemToAdd)) {
    item = new Fish(config)
  }

  item.init()
  manager.inventory.push(item)
}

function drawQuantity (ctx, x, y, quantity, width, height) {
  // draw a small grey circle behind where we're going to draw the quantity
  ctx.fillStyle = 'grey'
  ctx.beginPath()
  ctx.arc(x + width - 10, y + height - 10, 8, 0, Math.PI * 2)
  ctx.fill()

  // draw the quantity in the bottom right corner of the item
  ctx.fillStyle = 'black'
  ctx.font = '14px Arial'
  ctx.textAlign = 'right'
  const quantityString = `${quantity > 9 ? '9+' : quantity}`
  const quantityXPos = quantity > 9 ? x + width : x + width - 8
  ctx.fillText(quantityString, quantityXPos, y + height - 9)
}
