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
// import Apple from '../entities/crops/Apple.js'
import Carrot from '../entities/crops/Carrot.js'
// import Cherry from '../entities/crops/Cherry.js'
import Corn from '../entities/crops/Corn.js'
import Eggplant from '../entities/crops/Eggplant.js'
// import Lemon from '../entities/crops/Lemon.js'
import Lettuce from '../entities/crops/Lettuce.js'
// import Lime from '../entities/crops/Lime.js'
// import Maple from '../entities/crops/Maple.js'
// import Oak from '../entities/crops/Oak.js'
import Onion from '../entities/crops/Onion.js'
// import Orange from '../entities/crops/Orange.js'
import Pepper from '../entities/crops/Pepper.js'
// import Pine from '../entities/crops/Pine.js'
// import Plum from '../entities/crops/Plum.js'
import Potato from '../entities/crops/Potato.js'
import Pumpkin from '../entities/crops/Pumpkin.js'
import Radish from '../entities/crops/Radish.js'
import Strawberry from '../entities/crops/Strawberry.js'
import Tomato from '../entities/crops/Tomato.js'
import Watermelon from '../entities/crops/Watermelon.js'

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

  addItemToInventory (itemToAdd, quantity = 1) {
    // TODO: We'll need to handle finding the item in the inventory and updating the quantity...
    let item = null

    if (this.entityManager.isSeed(itemToAdd) ||
        this.entityManager.isCrop(itemToAdd) ||
        this.entityManager.isForageable(itemToAdd) ||
        this.entityManager.isTool(itemToAdd)) {
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
        this.entityManager.isTool(itemToRemove)) {
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

  getSeeds () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isSeed(item))
  }

  getForagables () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isForageable(item))
  }

  getCrops () {
    const inventory = this.getInventory()
    return inventory.filter(item => this.entityManager.isCrop(item))
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
      if (this.entityManager.isTallCropSeed(seed)) {
        seed.drawAsInventory(
          seed.x,
          seed.y - (3 * this.itemHeight / 4) - 1,
          this.itemWidth,
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

    if (this.selectedItem) {
      this.selectedItemHighlight.draw(this.selectedItem.x, this.selectedItem.y)
    }
  }
}

function buildInventory (inventoryManager) {
  const inventoryData = inventoryManager.gameManager.getInventory()
  for (const inventoryItem of inventoryData) {
    initializeInventory(inventoryManager, inventoryItem, inventoryItem.quantity)
  }
}

function initializeInventory (manager, itemToAdd, quantity = 1) {
  if (manager.entityManager.isSeed(itemToAdd)) {
    initializeSeedPackets(manager, itemToAdd, quantity)
  } else if (manager.entityManager.isTool(itemToAdd)) {
    initializeTools(manager, itemToAdd, quantity)
  } else if (manager.entityManager.isForageable(itemToAdd)) {
    initializeForageables(manager, itemToAdd, quantity)
  } else if (manager.entityManager.isCrop(itemToAdd)) {
    initializeCrops(manager, itemToAdd, quantity)
  }
}

function initializeSeedPackets (manager, itemToAdd, quantity = 1) {
  let item  = null
  const config = {
    game: manager.game,
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

function initializeTools (manager, itemToAdd, quantity = 1) {
  let item  = null
  const config = {
    game: manager.game,
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

function initializeForageables (manager, itemToAdd, quantity = 1) {
  let item  = null
  const config = {
    game: manager.game,
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

function initializeCrops (manager, itemToAdd, quantity = 1) {
  let item  = null

  const config = {
    game: manager.game,
    imageManager: manager.imageManager,
    type: itemToAdd.type,
    x: 0,
    y: 0,
    width: manager.itemWidth,
    height: manager.itemHeight,
    quantity
  }

  switch (itemToAdd.type) {
    case EntityTypes.Apple:
      item = new Apple(config)
      break
    case EntityTypes.Carrot:
      item = new Carrot(config)
      break
    case EntityTypes.Cherry:
      item = new Cherry(config)
      break
    case EntityTypes.Corn:
      item = new Corn(config)
      break
    case EntityTypes.Eggplant:
      item = new Eggplant(config)
      break
    case EntityTypes.Lemon:
      item = new Lemon(config)
      break
    case EntityTypes.Lettuce:
      item = new Lettuce(config)
      break
    case EntityTypes.Lime:
      item = new Lime(config)
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
    case EntityTypes.Orange:
      item = new Orange(config)
      break
    case EntityTypes.Pepper:
      item = new Pepper(config)
      break
    case EntityTypes.Pine:
      item = new Pine(config)
      break
    case EntityTypes.Plum:
      item = new Plum(config)
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
  ctx.fillText(`${quantity > 9 ? '9+' : quantity}`, x + width - 8, y + height - 9)
}
