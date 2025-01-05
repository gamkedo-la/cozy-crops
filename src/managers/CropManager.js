import { TileHeight, TileWidth } from '../globals/Constants.js'
import EntityTypes from '../globals/EntityTypes.js'
import Carrot from '../entities/crops/Carrot.js'
import Corn from '../entities/crops/Corn.js'
import Eggplant from '../entities/crops/Eggplant.js'
import Fruit from '../entities/crops/Fruit.js'
import Lettuce from '../entities/crops/Lettuce.js'
import Onion from '../entities/crops/Onion.js'
import Pepper from '../entities/crops/Pepper.js'
import Potato from '../entities/crops/Potato.js'
import Pumpkin from '../entities/crops/Pumpkin.js'
import Radish from '../entities/crops/Radish.js'
import Strawberry from '../entities/crops/Strawberry.js'
import Tomato from '../entities/crops/Tomato.js'
import Watermelon from '../entities/crops/Watermelon.js'
import AppleTree from '../entities/trees/AppleTree.js'
import CherryTree from '../entities/trees/CherryTree.js'
import LemonTree from '../entities/trees/LemonTree.js'
import LimeTree from '../entities/trees/LimeTree.js'
import MapleTree from '../entities/trees/MapleTree.js'
import OakTree from '../entities/trees/OakTree.js'
import OrangeTree from '../entities/trees/OrangeTree.js'
import PineTree from '../entities/trees/PineTree.js'
import PlumTree from '../entities/trees/PlumTree.js'
import Daffodil from '../entities/forageables/Daffodil.js'
import Sunflower from '../entities/forageables/Sunflower.js'
import Truffel from '../entities/forageables/Truffel.js'
import Tulip from '../entities/forageables/Tulip.js'
import WildGarlic from '../entities/forageables/WildGarlic.js'
import WildRose from '../entities/forageables/WildRose.js'
import Wood from '../entities/crops/Wood.js'

export default class CropManager {
  constructor (config) {
    Object.assign(this, config)

    this.crops = []
    this.wateredCrops = []

    this.trees = []
  }

  initializeTrees (treeStarts) {
    let newTree = null
    const treeConfig = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      manager: this,
      x: 0,
      y: 0
    }

    for (const treeStart of treeStarts) {
      treeConfig.x = treeStart.x
      treeConfig.y = treeStart.y

      switch (treeStart.type) {
        case EntityTypes.AppleTree:
          newTree = new AppleTree(treeConfig)
          break
        case EntityTypes.CherryTree:
          newTree = new CherryTree(treeConfig)
          break
        case EntityTypes.LemonTree:
          newTree = new LemonTree(treeConfig)
          break
        case EntityTypes.LimeTree:
          newTree = new LimeTree(treeConfig)
          break
        case EntityTypes.MapleTree:
          newTree = new MapleTree(treeConfig)
          break
        case EntityTypes.OakTree:
          newTree = new OakTree(treeConfig)
          break
        case EntityTypes.OrangeTree:
          newTree = new OrangeTree(treeConfig)
          break
        case EntityTypes.PineTree:
          newTree = new PineTree(treeConfig)
          break
        case EntityTypes.PlumTree:
          newTree = new PlumTree(treeConfig)
          break
      }

      if (newTree) {
        this.trees.push(newTree)
        newTree.currentGrowthStage = newTree.growthStages.length - 4 // Start at MatureTree
        newTree.init()
        this.entityManager.addEntity(newTree)
      }
    }
  }

  restoreCrops () {
    const crops = this.gameManager.getCrops()

    crops.forEach(crop => {
      const newCrop = restoreCropFromMemory(this, crop.type, crop.x, crop.y)
      if (newCrop) {
        newCrop.currentGrowthStage = crop.currentGrowthStage
        this.crops.push(newCrop)
        newCrop.init()
        this.entityManager.addEntity(newCrop)  
      }
    })
  }

  plantCrop (cropType, x, y) {
    const newCrop = createCropFromSeed(this, cropType, x, y)

    if (newCrop) {
      this.crops.push(newCrop)
      newCrop.init()
      this.inventoryManager.removeItemFromInventory({ type: cropType }, 1)
      this.entityManager.addEntity(newCrop)
      this.gameManager.addCrop(newCrop)
    }
  }

  getCropForType (cropType, x, y) {
    return restoreCropFromMemory(this, cropType, x, y)
  }

  getTreeForType (treeType, x, y) {
    let newTree = null
    const treeConfig = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      manager: this,
      x,
      y
    }

    switch (treeType) {
      case EntityTypes.AppleTree:
        newTree = new AppleTree(treeConfig)
        break
      case EntityTypes.CherryTree:
        newTree = new CherryTree(treeConfig)
        break
      case EntityTypes.LemonTree:
        newTree = new LemonTree(treeConfig)
        break
      case EntityTypes.LimeTree:
        newTree = new LimeTree(treeConfig)
        break
      case EntityTypes.MapleTree:
        newTree = new MapleTree(treeConfig)
        break
      case EntityTypes.OakTree:
        newTree = new OakTree(treeConfig)
        break
      case EntityTypes.OrangeTree:
        newTree = new OrangeTree(treeConfig)
        break
      case EntityTypes.PineTree:
        newTree = new PineTree(treeConfig)
        break
      case EntityTypes.PlumTree:
        newTree = new PlumTree(treeConfig)
        break
    }

    newTree.init()

    return newTree
  }

  getForagableForType (foragableType, x, y) {
    let newForagable = null
    const foragableConfig = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      manager: this,
      x,
      y
    }

    switch (foragableType) {
      case EntityTypes.Daffodil:
        newForagable = new Daffodil(foragableConfig)
        break
      case EntityTypes.Sunflower:
        newForagable = new Sunflower(foragableConfig)
        break
      case EntityTypes.Truffel:
        newForagable = new Truffel(foragableConfig)
        break
      case EntityTypes.Tulip:
        newForagable = new Tulip(foragableConfig)
        break
      case EntityTypes.WildGarlic:
        newForagable = new WildGarlic(foragableConfig)
        break
      case EntityTypes.WildRose:
        newForagable = new WildRose(foragableConfig)
        break
    }

    newForagable.init()

    return newForagable
  }
  
  plantTree (treeType, x, y) {
    let tree = null
    const treeConfig = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      manager: this
    }

    switch (treeStart.type) {
      case EntityTypes.AppleTree:
        tree = new AppleTree({
          ...treeConfig,
          x: treeStart.x,
          y: treeStart.y
        })
        break
    }

    if (tree) {
      this.trees.push(tree)
      tree.init()
      this.entityManager.addEntity(tree)  
    }
  }

  getTreeAt (x, y) {
    const tileTopLeft = this.mapManager.getTileTopLeftAtPixelPos(x, y)

    const tree = this.trees.find(tree => {
      return (
        tree.collisionPoint.x >= tileTopLeft.x &&
        tree.collisionPoint.x <= tileTopLeft.x + TileWidth &&
        tree.collisionPoint.y >= tileTopLeft.y &&
        tree.collisionPoint.y <= tileTopLeft.y + TileHeight
      )
    })

    return tree
  }

  waterAt (x, y) {
    const crop = this.getCropAt(x, y)

    if (crop) this.wateredCrops.push(crop)
  }

  getCropAt (x, y) {
    const tileTopLeft = this.mapManager.getTileTopLeftAtPixelPos(x, y)

    const crop = this.crops.find(crop => {
      const cropTopLeft = this.mapManager.getTileTopLeftAtPixelPos((crop.collisionPoint?.x || crop.x), (crop.collisionPoint?.y || crop.y))

      return cropTopLeft.x === tileTopLeft.x && cropTopLeft.y === tileTopLeft.y
    })

    return crop
  }

  isWatered (crop) {
    return this.wateredCrops.includes(crop)
  }

  advanceDay () {
    this.crops.forEach(crop => {
      crop.advanceDay()
    })
    this.trees.forEach(tree => {
      tree.advanceDay()
    })

    this.gameManager.updateCrops(this.crops)

    this.wateredCrops = []
  }

  harvestCrop (crop) {
    const index = this.crops.indexOf(crop)
    if (index > -1) {
      this.crops.splice(index, 1)
      this.gameManager.removeCrop(crop)
    }

    const wateredIndex = this.wateredCrops.indexOf(crop)
    if (wateredIndex > -1) this.wateredCrops.splice(wateredIndex, 1)
  }

  clearCrop (crop) {
    this.harvestCrop(crop) // Same action, but nobody else needs to know that
  }
}

function createCropFromSeed (manager, cropType, x, y) {
  let newCrop = null
  const cropConfig = {
    game: manager.game,
    scene: manager.scene,
    imageManager: manager.imageManager,
    manager,
    x,
    y
  }

  switch (cropType) {
    case EntityTypes.CarrotSeed:
      newCrop = new Carrot(cropConfig)
      break
    case EntityTypes.CornSeed:
      newCrop = new Corn(cropConfig)
      break
    case EntityTypes.EggplantSeed:
      newCrop = new Eggplant(cropConfig)
      break
    case EntityTypes.LettuceSeed:
      newCrop = new Lettuce(cropConfig)
      break
    case EntityTypes.OnionSeed:
      newCrop = new Onion(cropConfig)
      break
    case EntityTypes.PepperSeed:
      newCrop = new Pepper(cropConfig)
      break
    case EntityTypes.PotatoSeed:
      newCrop = new Potato(cropConfig)
      break
    case EntityTypes.PumpkinSeed:
      newCrop = new Pumpkin(cropConfig)
      break
    case EntityTypes.RadishSeed:
      newCrop = new Radish(cropConfig)
      break
    case EntityTypes.StrawberrySeed:
      newCrop = new Strawberry(cropConfig)
      break
    case EntityTypes.TomatoSeed:
      newCrop = new Tomato(cropConfig)
      break
    case EntityTypes.WatermelonSeed:
      newCrop = new Watermelon(cropConfig)
      break
    case EntityTypes.AppleTreeSeed:
      newCrop = new AppleTree(cropConfig)
      break
  }

  return newCrop
}

function restoreCropFromMemory (manager, cropType, x, y) {
  let newCrop = null
  const cropConfig = {
    game: manager.game,
    scene: manager.scene,
    imageManager: manager.imageManager,
    manager,
    x,
    y
  }

  switch (cropType) {
    case EntityTypes.Carrot:
      newCrop = new Carrot(cropConfig)
      break
    case EntityTypes.Corn:
      newCrop = new Corn(cropConfig)
      break
    case EntityTypes.Eggplant:
      newCrop = new Eggplant(cropConfig)
      break
    case EntityTypes.Lettuce:
      newCrop = new Lettuce(cropConfig)
      break
    case EntityTypes.Onion:
      newCrop = new Onion(cropConfig)
      break
    case EntityTypes.Pepper:
      newCrop = new Pepper(cropConfig)
      break
    case EntityTypes.Potato:
      newCrop = new Potato(cropConfig)
      break
    case EntityTypes.Pumpkin:
      newCrop = new Pumpkin(cropConfig)
      break
    case EntityTypes.Radish:
      newCrop = new Radish(cropConfig)
      break
    case EntityTypes.Strawberry:
      newCrop = new Strawberry(cropConfig)
      break
    case EntityTypes.Tomato:
      newCrop = new Tomato(cropConfig)
      break
    case EntityTypes.Watermelon:
      newCrop = new Watermelon(cropConfig)
      break
    case EntityTypes.Apple:
    case EntityTypes.Cherry:
    case EntityTypes.Lemon:
    case EntityTypes.Lime:
    case EntityTypes.Orange:
    case EntityTypes.Plum:
      newCrop = new Fruit({ ...cropConfig, type: cropType })
      break
    case EntityTypes.AppleWood:
    case EntityTypes.CherryWood:
    case EntityTypes.LemonWood:
    case EntityTypes.LimeWood:
    case EntityTypes.MapleWood:
    case EntityTypes.OakWood:
    case EntityTypes.OrangeWood:
    case EntityTypes.PineWood:
    case EntityTypes.PlumWood:
      newCrop = new Wood({ ...cropConfig, type: cropType })
      break
    case EntityTypes.AppleTree:
      newCrop = new AppleTree(cropConfig)
      break
    case EntityTypes.CherryTree:
      newCrop = new CherryTree(cropConfig)
      break
    case EntityTypes.LemonTree:
      newCrop = new LemonTree(cropConfig)
      break
    case EntityTypes.LimeTree:
      newCrop = new LimeTree(cropConfig)
      break
    case EntityTypes.MapleTree:
      newCrop = new MapleTree(cropConfig)
      break
    case EntityTypes.OakTree:
      newCrop = new OakTree(cropConfig)
      break
    case EntityTypes.OrangeTree:
      newCrop = new OrangeTree(cropConfig)
      break
    case EntityTypes.PineTree:
      newCrop = new PineTree(cropConfig)
      break
    case EntityTypes.PlumTree:
      newCrop = new PlumTree(cropConfig)
      break
    case EntityTypes.Daffodil:
      newCrop = new Daffodil(cropConfig)
      break
    case EntityTypes.Sunflower:
      newCrop = new Sunflower(cropConfig)
      break
    case EntityTypes.Truffel:
      newCrop = new Truffel(cropConfig)
      break
    case EntityTypes.Tulip:
      newCrop = new Tulip(cropConfig)
      break
    case EntityTypes.WildGarlic:
      newCrop = new WildGarlic(cropConfig)
      break
    case EntityTypes.WildRose:
      newCrop = new WildRose(cropConfig)
      break
    case EntityTypes.Wood:
      newCrop = new Wood(cropConfig)
      break
  }

  newCrop.init()

  return newCrop
}