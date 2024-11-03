import Crop from './Crop.js'
import CropAnimations from '../../globals/CropAnimations.js'
import CropData from '../../globals/CropData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Carrot extends Crop {
  constructor (config) {
    config.type = EntityTypes.Carrot
    config = {...config, ...CropData[EntityTypes.Carrot]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(CropAnimations.Carrot)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, CropAnimations.Carrot[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = CropAnimations.Carrot[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(CropAnimations.Carrot[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    if (this.growthStages[this.currentGrowthStage] === 'YoungPlant' || this.growthStages[this.currentGrowthStage] === 'MaturePlant') {
      const key = this.growthStages[this.currentGrowthStage] + type
      return this.animations[key]
    } else {
      return this.animations[this.growthStages[this.currentGrowthStage]]
    }
  }
}