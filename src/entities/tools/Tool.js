import ToolAnimations from '../../globals/ToolAnimations.js'
import Animation from '../../components/Animation.js'
import ToolData from '../../globals/ToolData.js'

export default class Tool {
  constructor (config) {
    Object.assign(this, config)
    const toolData = ToolData[this.type]
    Object.assign(this, toolData)

    this.animations = {}
    this.currentAnimation = null // Initialize once animations are built
    this.staminaConsumed = 1.75
  }

  init () {
    this.buildAnimations()

    this.currentAnimation = this.getAnimation()

    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height
  }

  buildAnimations () {
    // override this method in subclasses
  }

  getAnimation () {
    // override this method in subclasses
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
  }

  draw (camera) {
    this.currentAnimation?.draw(this.x, this.y, camera)
  }

  drawAsInventory (x, y, width, height) {
    const frame = this.animations['Inventory'].getCurrentFrame()
    this.game.ctx.drawImage(this.currentAnimation.spritesheet, frame.x, frame.y, frame.width, frame.height, x, y, width, height)
  }
}