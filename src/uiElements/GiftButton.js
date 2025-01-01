import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class GiftButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.GiftButton.x
    config.sourceY = UISpriteData.GiftButton.y
    config.width = UISpriteData.GiftButton.width
    config.height = UISpriteData.GiftButton.height
    super(config)
  }

  activate () {
    if (this.scene.shopType === 'gift') {
      this.scene.giveItem()
    } else {
      this.scene.showGiftDialogue()
    }
  }
}