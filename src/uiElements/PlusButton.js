import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class PlusButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.PlusButton.x
    config.sourceY = UISpriteData.PlusButton.y
    config.width = UISpriteData.PlusButton.width
    config.height = UISpriteData.PlusButton.height
    super(config)

    this.disabled = false
  }

  setDisabled (disabled) {
    this.disabled = disabled
  }

  activate () {
    this.scene.increaseQuantity()
  }

  checkClicked (x, y) {
    const wasClicked = super.checkClicked(x, y)
    if (wasClicked && this.visible && !this.disabled) {
      this.activate()
    }
  }

  draw () {
    if (this.disabled) {
      this.scene.game.ctx.globalAlpha = 0.5
    }

    super.draw()

    if (this.disabled) {
      this.scene.game.ctx.globalAlpha = 1
    }
  }
}