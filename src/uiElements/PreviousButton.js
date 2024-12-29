import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class PreviousButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.PreviousButton.x
    config.sourceY = UISpriteData.PreviousButton.y
    config.width = UISpriteData.PreviousButton.width
    config.height = UISpriteData.PreviousButton.height
    super(config)
  }

  activate () {
    this.scene.showPreviousPage()
  }

  checkClicked (x, y) {
    const wasClicked = super.checkClicked(x, y)
    if (wasClicked && this.visible && !this.disabled) {
      this.activate()
    }
  }
}