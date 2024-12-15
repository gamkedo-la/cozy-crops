import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class CancelButton extends CanvasButton {
  constructor (config) {
    config.sourceX = UISpriteData.CancelButton.x
    config.sourceY = UISpriteData.CancelButton.y
    config.width = UISpriteData.CancelButton.width
    config.height = UISpriteData.CancelButton.height
    super(config)
  }

  activate () {
    this.scene.hideShowingDialogue()
  }
}