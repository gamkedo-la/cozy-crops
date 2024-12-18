import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class NextButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.NextButtonSmall.x
    config.sourceY = UISpriteData.NextButtonSmall.y
    config.width = UISpriteData.NextButtonSmall.width
    config.height = UISpriteData.NextButtonSmall.height
    super(config)

    this.disabled = false
  }

  setDisabled (disabled) {
    this.disabled = disabled
  }

  activate () {
    this.scene.showNextPage()
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