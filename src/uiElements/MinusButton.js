import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class MinusButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.MinusButton.x
    config.sourceY = UISpriteData.MinusButton.y
    config.width = UISpriteData.MinusButton.width
    config.height = UISpriteData.MinusButton.height
    super(config)

    this.disabled = false
  }

  setDisabled (disabled) {
    this.disabled = disabled
  }

  activate () {
    this.scene.decreaseQuantity()
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