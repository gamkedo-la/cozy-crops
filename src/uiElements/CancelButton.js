import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class CancelButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.CancelButtonSmall.x
    config.sourceY = UISpriteData.CancelButtonSmall.y
    config.width = UISpriteData.CancelButtonSmall.width
    config.height = UISpriteData.CancelButtonSmall.height
    super(config)
  }

  activate () {
    if (this.scene.hideShowingDialogue) {
      this.scene.hideShowingDialogue()
    } else if (this.scene.cancelPurchase) {
      this.scene.cancelPurchase()
    }
  }
}