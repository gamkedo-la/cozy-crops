import { FamilyNames } from '../globals/Fonts.js'
import UIAttributes from '../globals/UIAttributes.js'
import SelectedInventoryHighlight from './SelectedInventoryHighlight.js'

export default class StoreItemElement {
  constructor (config) {
    Object.assign(this, config)

    this.x  = this.game.canvas.width / 2 - this.sourceWidth
    this.width = 2 * this.sourceWidth
    this.height = 2 * this.sourceHeight
    this.itemWidth = 40
    this.itemHeight = 40
    this.selectedFrame = null
  }

  init () {
    this.selectedFrame = new SelectedInventoryHighlight({
      game: this.game,
      imageManager: this.imageManager,
      x: 0,
      y: 0,
      width: this.itemWidth,
      height: this.itemHeight
    })
  }

  update (deltaTime, mousePos) {}

  draw () {
    this.game.ctx.drawImage(
      this.sourceImage,
      this.sourceX,
      this.sourceY,
      this.sourceWidth,
      this.sourceHeight,
      this.game.canvas.width / 2 - this.sourceWidth,
      this.y,
      2 * this.sourceWidth,
      2 * this.sourceHeight
    )

    this.game.ctx.fillStyle = 'black'
    this.game.ctx.font = `38px ${FamilyNames.FarmVintage}`
    this.game.ctx.textAlign = UIAttributes.LeftAlign
    this.game.ctx.fillText(this.name, this.x + 10, this.y + 30)

    this.icon.drawAsInventory(this.icon.x, this.icon.y, this.icon.width, this.icon.height)

    if (this.selected) {
      this.selectedFrame.draw(this.icon.x, this.icon.y)
    }
  }

  checkClicked (x, y) {
    return x > this.game.canvas.width / 2 - this.sourceWidth &&
      x < this.game.canvas.width / 2 + this.sourceWidth &&
      y > this.y &&
      y < this.y + 2 * this.sourceHeight
  }
}