import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class NextButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.NextButtonSmall.x
    config.sourceY = UISpriteData.NextButtonSmall.y
    config.width = UISpriteData.NextButtonSmall.width
    config.height = UISpriteData.NextButtonSmall.height
    super(config)
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
}