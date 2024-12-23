import { FamilyNames } from '../globals/Fonts.js'
import UIAttributes from '../globals/UIAttributes.js'
import SelectedInventoryHighlight from './SelectedInventoryHighlight.js'
import UISpriteData from '../globals/UISpriteData.js'
import { UISprites } from '../globals/Images.js'
import StoreUIData from '../globals/StoreUIData.js'

export default class StoreItemElement {
  constructor (config) {
    Object.assign(this, config)

    setImageSourceData(this)

    this.x  = this.game.canvas.width / 2 - this.sourceWidth
    this.width = 2 * this.sourceWidth
    this.height = 2 * this.sourceHeight
    this.itemWidth = 40
    this.itemHeight = 40
    this.selectedFrame = null
    this.priceString = `${this.price}`.padStart(3, '0')
    this.uiSpriteSource = this.imageManager.getImageWithSrc(UISprites)
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
      if (this.icon.width === this.icon.height) {
        this.selectedFrame.draw(this.icon.x, this.icon.y)
      } else {
        this.selectedFrame.draw(this.icon.x, this.icon.y + (this.icon.height / 2) - 8) // Adjust for tall crops, -8 is padding and scale
      }
    }

    for (let i = 0; i < this.priceString.length; i++) {
      let spriteData = null
      const priceDigit = this.priceString[i]

      switch (priceDigit) {
        case '0':
          spriteData = UISpriteData.Number0
          break
        case '1':
          spriteData = UISpriteData.Number1
          break
        case '2':
          spriteData = UISpriteData.Number2
          break
        case '3':
          spriteData = UISpriteData.Number3
          break
        case '4':
          spriteData = UISpriteData.Number4
          break
        case '5':
          spriteData = UISpriteData.Number5
          break
        case '6':
          spriteData = UISpriteData.Number6
          break
        case '7':
          spriteData = UISpriteData.Number7
          break
        case '8':
          spriteData = UISpriteData.Number8
          break
        case '9':
          spriteData = UISpriteData.Number9
          break
      }

      this.game.ctx.drawImage(
        this.uiSpriteSource,
        spriteData.x,
        spriteData.y,
        spriteData.width,
        spriteData.height,
        this.x + (this.width / 2) + 21 + (i * 16),
        this.y + 20,
        20,
        20
      )
    }
  }

  checkClicked (x, y) {
    return x > this.game.canvas.width / 2 - this.sourceWidth &&
      x < this.game.canvas.width / 2 + this.sourceWidth &&
      y > this.y &&
      y < this.y + 2 * this.sourceHeight
  }
}

function setImageSourceData (element) {
  switch (element.shopType) {
    case 'store':
      element.sourceX = StoreUIData.StoreItem.x
      element.sourceY = StoreUIData.StoreItem.y
      element.sourceWidth = StoreUIData.StoreItem.width
      element.sourceHeight = StoreUIData.StoreItem.height
    break
    case 'blacksmithshop':
      element.sourceX = StoreUIData.BlacksmithItem.x
      element.sourceY = StoreUIData.BlacksmithItem.y
      element.sourceWidth = StoreUIData.BlacksmithItem.width
      element.sourceHeight = StoreUIData.BlacksmithItem.height
    break
    case 'carpentryshop':
      element.sourceX = StoreUIData.CarpentryItem.x
      element.sourceY = StoreUIData.CarpentryItem.y
      element.sourceWidth = StoreUIData.CarpentryItem.width
      element.sourceHeight = StoreUIData.CarpentryItem.height
    break    
  }
}