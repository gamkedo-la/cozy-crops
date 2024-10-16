import Insect from './Insect.js'
import EntityTypes from '../../globals/EntityTypes.js'
import { ButterflyAnimationData } from '../../globals/WildlifeAnimations.js'
import Animation from '../../components/Animation.js'

export default class Butterfly extends Insect {
  init () {
    this.buildAnimations()
    this.currentAnimation = this.getAnimation('Flying')
  }

  buildAnimations () {
    let animationData = ButterflyAnimationData
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