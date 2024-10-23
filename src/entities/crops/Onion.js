import Crop from './Crop.js'
import CropAnimations from '../../globals/CropAnimations.js'
import Animation from '../../components/Animation.js'

export default class Onion extends Crop {
  buildAnimations () {
    const animationKeys = Object.keys(CropAnimations.Onion)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, CropAnimations.Onion[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = CropAnimations.Onion[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(CropAnimations.Onion[key].spritesheet)
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