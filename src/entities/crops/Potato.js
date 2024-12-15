import Crop from './Crop.js'
import CropAnimations from '../../globals/CropAnimations.js'
import CropData from '../../globals/CropData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Potato extends Crop {
  constructor (config) {
    config.type = EntityTypes.Potato
    config = {...config, ...CropData[EntityTypes.Potato]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(CropAnimations.Potato)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, CropAnimations.Potato[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = CropAnimations.Potato[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(CropAnimations.Potato[key].spritesheet)
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