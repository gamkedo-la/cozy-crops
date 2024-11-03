import { TileHeight, TileWidth } from '../globals/Constants.js'
import Carrot from '../entities/crops/Carrot.js'
import Corn from '../entities/crops/Corn.js'
import Lettuce from '../entities/crops/Lettuce.js'
import Onion from '../entities/crops/Onion.js'

export default class CropManager {
  constructor (config) {
    Object.assign(this, config)

    this.crops = []
    this.wateredCrops = []
  }

  plantCrop (cropType, x, y) {
    let newCrop = null
    switch (cropType) {
      case 'Lettuce':
        this.crops.push(new Lettuce({
          game: this.game,
          scene: this.scene,
          imageManager: this.imageManager,
          x,
          y
        }))
        break
      case 'Onion':
        this.crops.push(new Onion({
          game: this.game,
          scene: this.scene,
          imageManager: this.imageManager,
          x,
          y
        }))
        break
      case 'Carrot':
        this.crops.push(new Carrot({
          game: this.game,
          scene: this.scene,
          imageManager: this.imageManager,
          x,
          y
        }))
        break
      case 'Corn':
        this.crops.push(new Corn({
          game: this.game,
          scene: this.scene,
          imageManager: this.imageManager,
          x,
          y
        }))
        break
    }

    if (newCrop) {
      newCrop.init()
      this.entityManager.addEntity(newCrop)
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

  advanceDay () {
    this.crops.forEach(crop => {
      crop.currentGrowthStage++
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