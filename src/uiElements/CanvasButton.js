import { UISprites } from '../globals/Images.js'

export default class CanvasButton {
  constructor (config) {
    Object.assign(this, config)

    this.rect = {
      top: this.y,
      left: this.x,
      width: 2 * this.width,
      height: 2 * this.height
    }

    this.visible = true
    this.disabled = false
  }

  setDisabled (disabled) {
    this.disabled = disabled
  }

  show () {
    this.visible = true
  }

  hide () {
    this.visible = false
  }

  draw () {
    if (!this.visible) return

    if (this.disabled) {
      this.scene.game.ctx.globalAlpha = 0.5
    }

    this.scene.game.ctx.drawImage(
      this.scene.imageManager.getImageWithSrc(UISprites),
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.rect.left,
      this.rect.top,
      this.rect.width,
      this.rect.height
    )

    if (this.disabled) {
      this.scene.game.ctx.globalAlpha = 1
    }
  }

  setPosition (x, y) {
    this.x = x
    this.y = y
    this.rect.left = x
    this.rect.top = y
  }

  checkClicked (x, y) {
    if (!this.visible) return false

    return (x >= this.rect.left &&
      x <= this.rect.left + this.rect.width &&
      y >= this.rect.top &&
      y <= this.rect.top + this.rect.height)
  }

  activate () {
    // Override this method in subclasses
  }
}