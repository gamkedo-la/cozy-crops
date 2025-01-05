import WoodAnimations from '../../globals/WoodAnimations.js'
import Animation from '../../components/Animation.js'

export default class Wood {
  constructor (config) {
    Object.assign(this, config)

    this.animations = {}
    this.currentAnimation = null // Initialize once animations are built
    this.quantity = config.quantity || 1
  }

  init () {
    this.buildAnimations()

    this.currentAnimation = this.getAnimation()
  }

  buildAnimations () {
    let animationData = WoodAnimations[this.type]

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

  getAnimation (type = 'Log') {
    return this.animations[type]
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
  }

  drawAsInventory (x, y, width, height) {
    const frame = this.animations['Log'].getCurrentFrame()
    this.game.ctx.drawImage(this.currentAnimation.spritesheet, frame.x, frame.y, frame.width, frame.height, x, y, width, height)
  }
}