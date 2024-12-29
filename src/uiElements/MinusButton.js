import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class MinusButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.MinusButton.x
    config.sourceY = UISpriteData.MinusButton.y
    config.width = UISpriteData.MinusButton.width
    config.height = UISpriteData.MinusButton.height
    super(config)
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
}