import { Steve } from '../globals/Images.js'
import Animations from '../globals/Animations.js'
import Animation from '../components/Animation.js'

export default class Player {
  constructor (config) {
    Object.assign(this, config)

    this.animations = {}
    buildAnimations(this)
    this.animation = this.animations.SteveIdleDown
    this.flip = false
  }

  update (deltaTime) {
    this.animation.update(deltaTime)
  }

  draw () {
    this.animation.draw(this.x, this.y)
  }
}

function buildAnimations (player) {
  for (const animation of Object.values(Animations)) {
    const animationConfig = Object.assign({}, animation)
    animationConfig.game = player.game
    animationConfig.imageManager = player.imageManager
    animationConfig.imageSrc = animation.spritesheet

    player.animations[animation.name] = new Animation(animationConfig)
  }
}