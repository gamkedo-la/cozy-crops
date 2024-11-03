import { UISprites } from '../globals/Images.js'
import { SelectedInventoryItem } from '../globals/UISpriteData.js'

export default class SelectedInventoryHighlight {
  constructor (config) {
    Object.assign(this, config)
    this.imageSrc = UISprites
    this.source
  }

  draw (x, y) {
    this.game.ctx.drawImage(this.imageManager.getImageWithSrc(this.imageSrc), SelectedInventoryItem.x, SelectedInventoryItem.y, SelectedInventoryItem.width, SelectedInventoryItem.height, x - 3, y - 6, 2 * (SelectedInventoryItem.width - SelectedInventoryItem.padding), 2 * (SelectedInventoryItem.height - SelectedInventoryItem.padding))
  }
}