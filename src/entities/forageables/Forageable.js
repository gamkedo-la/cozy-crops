import ForageableAnimations from '../../globals/ForageableAnimations.js'
import Animation from '../../components/Animation.js'
import ForageableData from '../../globals/ForageableData.js'

export default class Forageable {
  constructor (config) {
    Object.assign(this, config)

    this.width = 0 // Initialize once animations are built
    this.height = 0 // Initialize once animations are built
    this.animations = {}
    this.currentAnimation = null // Initialize once animations are built
    this.collisionPoint = {
      x: 0, // Initialize once animations are built
      y: 0 // Initialize once animations are built
    }
  }

  init () {
    this.buildAnimations()

    this.currentAnimation = this.getAnimation()

    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height

    this.y -= (this.currentAnimation.height)
    this.collisionPoint = {
      x: this.x + this.currentAnimation.width / 2,
      y: this.y + this.currentAnimation.height
    }
  }

  buildAnimations () {
    // override this method in subclasses
  }

  getAnimation () {
    // override this method in subclasses
  }

  harvest () {
    return { quantity: 1, seedQuantity: 0 }
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
    this.collisionPoint = {
      x: this.x + this.currentAnimation.width / 2,
      y: this.y + this.currentAnimation.height
    }
  }

  draw (camera) {
    this.currentAnimation?.draw(this.x, this.y, camera)
  }

  drawAsInventory (x, y, width, height) {
    const frame = this.animations['Inventory'].getCurrentFrame()
    this.game.ctx.drawImage(this.currentAnimation.spritesheet, frame.x, frame.y, frame.width, frame.height / 2, x, y, width, height)
  }
}