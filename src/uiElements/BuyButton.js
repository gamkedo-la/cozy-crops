import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class BuyButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.BuyButton.x
    config.sourceY = UISpriteData.BuyButton.y
    config.width = UISpriteData.BuyButton.width
    config.height = UISpriteData.BuyButton.height
    super(config)
  }

  activate () {
    if (!this.visible || this.disabled) return

    if (this.scene.showBuyDialogue) {
      this.scene.showBuyDialogue()
    } else if (this.scene.buyItem) {
      this.scene.buyItem()
    }
  }
}