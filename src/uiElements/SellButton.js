import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class SellButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.SellButton.x
    config.sourceY = UISpriteData.SellButton.y
    config.width = UISpriteData.SellButton.width
    config.height = UISpriteData.SellButton.height
    super(config)
  }

  activate () {
    this.scene.showSellDialogue()
  }
}