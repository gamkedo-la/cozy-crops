import Tool from './Tool.js'
import EntityTypes from '../../globals/EntityTypes.js'
import { FishingRodBamboo, FishingRodFiberglass, FishingRodSteel } from '../../globals/ToolAnimations.js'
import Animation from '../../components/Animation.js'

export default class FishingRod extends Tool {
  init () {
    this.buildAnimations()

    this.currentAnimation = this.getAnimation('Inventory')
  }

  buildAnimations () {
    let animationData = FishingRodBamboo
    if (this.type === EntityTypes.FishingRodFiberglass) {
      animationData = FishingRodFiberglass
    } else if (this.type === EntityTypes.FishingRodSteel) {
      animationData = FishingRodSteel
    }
    const animationKeys = Object.keys(animationData)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, animationData[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = animationData[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(animationData[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}