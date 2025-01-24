import FishIconData from '../../globals/FishIconData.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Fish {
  constructor (config) {
    Object.assign(this, config)

    this.animation = {}
    this.quantity = config.quantity || 1
  }

  init () {
    this.animation = FishIconData[this.type]
    this.animation.canvas = this.imageManager.getImageWithSrc(this.animation.spritesheet)
  }

  update (deltaTime) {
    // override this method in subclasses
  }

  draw (camera) {
    const imageX = this.animation.x
    const imageY = this.animation.y
    this.imageManager.draw(this.animation.canvas, this.x, this.y, this.animation.width, this.animation.height, imageX, imageY, camera, false)
  }

  drawAsInventory (x, y, width, height) {
    this.game.ctx.drawImage(this.animation.canvas, this.animation.x, this.animation.y, this.animation.width, this.animation.height, x, y, width, height)
  }
}