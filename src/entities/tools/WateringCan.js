import Tool from './Tool.js'
import EntityTypes from '../../globals/EntityTypes.js'
import { WateringCanCopper, WateringCanSteel, WateringCanWooden } from '../../globals/ToolAnimations.js'
import Animation from '../../components/Animation.js'

export default class WateringCan extends Tool {
  init () {
    this.buildAnimations()

    this.currentAnimation = this.getAnimation('Inventory')

    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height
  }

  buildAnimations () {
    let animationData = WateringCanWooden
    if (this.type === EntityTypes.WateringCanCopper) {
      animationData = WateringCanCopper
    } else if (this.type === EntityTypes.WateringCanSteel) {
      animationData = WateringCanSteel
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