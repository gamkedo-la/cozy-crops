import FurnitureAnimations from '../../globals/FurnitureAnimations.js'
import CarpentryIconData from '../../globals/CarpentryIconData.js'
// import Animation from '../../components/Animation.js'

export default class Furniture {
  constructor (config) {
    Object.assign(this, config)

    this.animations = {}
    this.currentAnimation = null // Initialize once animations are built
    this.seedCount = config.seedCount || 1
  }

  init () {
    this.buildAnimations()

    this.currentAnimation = this.getAnimation()
  }

  buildAnimations () {
    const idleData = FurnitureAnimations[this.type]
    idleData.owner = this
    idleData.game = this.game
    idleData.imageManager = this.imageManager
    idleData.imageSrc = idleData.spritesheet
    idleData.canvas = this.imageManager.getImageWithSrc(idleData.spritesheet)

    // const animationKeys = Object.keys(animationData)
    // animationKeys.forEach((key, index) => {
    //   const config = Object.assign({}, animationData[key])
    //   config.owner = this
    //   config.game = this.game
    //   config.imageManager = this.imageManager
    //   config.imageSrc = animationData[key].spritesheet
    //   config.canvas = this.imageManager.getImageWithSrc(animationData[key].spritesheet)
    //   this.animations[key] = new Animation(config)
    // })
    this.animations['Idle'] = idleData

    if (CarpentryIconData[this.type]) {
      const inventoryConfig = CarpentryIconData[this.type]
      inventoryConfig.owner = this
      inventoryConfig.game = this.game
      inventoryConfig.imageManager = this.imageManager
      inventoryConfig.imageSrc = CarpentryIconData[this.type].spritesheet
      inventoryConfig.canvas = this.imageManager.getImageWithSrc(CarpentryIconData[this.type].spritesheet)
      this.animations['Inventory'] = inventoryConfig
    }
  }

  getAnimation (type = 'Inventory') {
    return this.animations[type]
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
  }

  draw (x, y, camera) {
    const imageX = this.animations['Idle'].x
    const imageY = this.animations['Idle'].y
    this.imageManager.draw(this.animations['Idle'].canvas, x, y, this.animations['Idle'].width, this.animations['Idle'].height, imageX, imageY, camera, false)
  }

  drawAsInventory (x, y, width, height) {
    const frame = this.animations['Inventory']
    this.game.ctx.drawImage(this.animations['Inventory'].canvas, frame.x, frame.y, frame.width, frame.height, x, y, width, height)
  }
}