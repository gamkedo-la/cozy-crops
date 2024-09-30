import Crop from './Crop.js'
import Animations from '../../globals/Animations.js'
import Animation from '../../components/Animation.js'

export default class Cabbage extends Crop {
  buildAnimations () {
    const animationKeys = Object.keys(Animations.Cabbage)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, Animations.Cabbage[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = Animations.Cabbage[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(Animations.Cabbage[key].spritesheet)
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