import { TileHeight, TileWidth } from '../globals/Constants.js'
import EntityTypes from '../globals/EntityTypes.js'
import Carrot from '../entities/crops/Carrot.js'
import Corn from '../entities/crops/Corn.js'
import Eggplant from '../entities/crops/Eggplant.js'
import Lettuce from '../entities/crops/Lettuce.js'
import Onion from '../entities/crops/Onion.js'
import Pepper from '../entities/crops/Pepper.js'
// import Potato from '../entities/crops/Potato.js'
// import Pumpkin from '../entities/crops/Pumpkin.js'
import Radish from '../entities/crops/Radish.js'
// import Strawberry from '../entities/crops/Strawberry.js'
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

  plantCrop (cropType, x, y) {
    let newCrop = null
    const cropConfig = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      manager: this,
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
      // case EntityTypes.PotatoSeed:
      //   newCrop = new Potato(cropConfig)
      //   break
      // case EntityTypes.PumpkinSeed:
      //   newCrop = new Pumpkin(cropConfig)
      //   break
      case EntityTypes.RadishSeed:
        newCrop = new Radish(cropConfig)
        break
      // case EntityTypes.StrawberrySeed:
      //   newCrop = new Strawberry(cropConfig)
      //   break
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

    if (newCrop) {
      this.crops.push(newCrop)
      newCrop.init()
      this.entityManager.addEntity(newCrop)
    }
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

  waterAt (x, y) {
    const tileX = Math.floor(x / TileWidth)
    const tileY = Math.floor(y / TileHeight)

    const crop = this.crops.find(crop => {
      const cropTileX = Math.floor(crop.x / TileWidth)
      const cropTileY = Math.floor(crop.y / TileHeight)

      return cropTileX === tileX && cropTileY === tileY
    })

    if (crop) this.wateredCrops.push(crop)
  }

  isWatered (crop) {
    return this.wateredCrops.includes(crop)
  }

  advanceDay () {
    this.crops.forEach(crop => {
      crop.advanceDay()
    })

    this.wateredCrops = []
  }

  harvestCrop (crop) {
    const index = this.crops.indexOf(crop)
    if (index > -1) this.crops.splice(index, 1)

    const wateredIndex = this.wateredCrops.indexOf(crop)
    if (wateredIndex > -1) this.wateredCrops.splice(wateredIndex, 1)
  }
}