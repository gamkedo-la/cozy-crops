import Crop from './Crop.js'
import CropAnimations from '../../globals/CropAnimations.js'
import CropData from '../../globals/CropData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Pumpkin extends Crop {
  constructor (config) {
    config.type = EntityTypes.Pumpkin
    config.seedType = EntityTypes.PumpkinSeed
    config = {...config, ...CropData[EntityTypes.Pumpkin]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(CropAnimations.Pumpkin)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, CropAnimations.Pumpkin[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = CropAnimations.Pumpkin[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(CropAnimations.Pumpkin[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    if (this.currentGrowthStage < 0) {
      return this.animations['Dead']
    } else if (this.growthStages[this.currentGrowthStage] === 'YoungPlant' || this.growthStages[this.currentGrowthStage] === 'MaturePlant') {
      const key = this.growthStages[this.currentGrowthStage] + type
      return this.animations[key]
    } else {
      return this.animations[this.growthStages[this.currentGrowthStage]]
    }
  }
}