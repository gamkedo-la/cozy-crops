import { FamilyNames } from '../globals/Fonts.js'
import UIAttributes from '../globals/UIAttributes.js'
import SelectedInventoryHighlight from './SelectedInventoryHighlight.js'
import UISpriteData from '../globals/UISpriteData.js'
import { UISprites } from '../globals/Images.js'
import StoreUIData from '../globals/StoreUIData.js'
import EntityTypes from '../globals/EntityTypes.js'
import Axe from '../entities/tools/Axe.js'
import FishingRod from '../entities/tools/FishingRod.js'
import Hoe from '../entities/tools/Hoe.js'
import Shovel from '../entities/tools/Shovel.js'
import WateringCan from '../entities/tools/WateringCan.js'
import Furniture from '../entities/furniture/Furniture.js'

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

    if (this.entityManager.isTallCropSeed({ type: this.type })) {
      this.icon.drawAsInventory(this.icon.x, this.icon.y - (3 * this.icon.height / 4) - 2, this.icon.width, 2 * this.icon.height)
    } else if (this.entityManager.isWood({ type: this.type })) {
      this.icon.drawAsInventory(this.icon.x + 2, this.icon.y - (this.icon.height / 2) - 4, 2 * this.icon.width, (5 * this.icon.height / 4))
    } else if (this.entityManager.isTreeFruit({ type: this.type })) {
      this.icon.drawAsInventory(this.icon.x - this.icon.width / 2, this.icon.y - this.icon.height / 2, 2 * this.icon.width, 2 * this.icon.height)
    } else if (this.entityManager.isFurniture({ type: this.type })) {
      this.icon.drawAsInventory(this.icon.x, this.icon.y, this.icon.width, this.icon.height)
    } else {
      this.icon.drawAsInventory(this.icon.x, this.icon.y, this.icon.width, this.icon.height)
    }

    if (this.selected) {
      if (this.entityManager.isTallCrop({ type: this.type })) {
        this.selectedFrame.draw(this.icon.x, this.icon.y + 30)
      } else if (this.entityManager.isTallCropSeed({ type: this.type })) {
        this.selectedFrame.draw(this.icon.x, this.icon.y + 32)
      } else if (this.entityManager.isTree({ type: this.type })) {
        this.selectedFrame.draw(this.icon.x, this.icon.y - 16)
      } else if (this.entityManager.isTreeSeed({ type: this.type })) {
        this.selectedFrame.draw(this.icon.x + 20, this.icon.y + 20)
      } else if (this.entityManager.isForageable({ type: this.type })) {
        this.selectedFrame.draw(this.icon.x, this.icon.y)
      } else if (this.entityManager.isTool({ type: this.type })) {
        this.selectedFrame.draw(this.icon.x, this.icon.y)
      } else if (this.entityManager.isWood({ type: this.type })) {
        this.selectedFrame.draw(this.icon.x + 20, this.icon.y + 20)
      } else if (this.entityManager.isFurniture({ type: this.type })) {
        this.selectedFrame.draw(this.icon.x, this.icon.y)
      } else {
        this.selectedFrame.draw(this.icon.x, this.icon.y)
      }
    }

    if (this.shopType === 'gift') return // No price for gifts
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

  getTool (element, type) {
    const config = {
      game: element.game,
      imageManager: element.imageManager,
      type,
      x: element.x + element.width - element.itemWidth - 8,
      y: element.y + 8,
      width: element.itemWidth,
      height: element.itemHeight,
      quantity: 1
    }
  
    let tool = null
    switch (type) {
      case EntityTypes.AxeCopper:
      case EntityTypes.AxeSteel:
      case EntityTypes.AxeTitanium:
        tool = new Axe(config)
        break
      case EntityTypes.FishingRodBamboo:
      case EntityTypes.FishingRodFiberglass:
      case EntityTypes.FishingRodSteel:
        tool = new FishingRod(config)
        break
      case EntityTypes.HoeWooden:
      case EntityTypes.HoeCopper:
      case EntityTypes.HoeSteel:
        tool = new Hoe(config)
        break
      case EntityTypes.ShovelWooden:
      case EntityTypes.ShovelCopper:
      case EntityTypes.ShovelSteel:
        tool = new Shovel(config)
        break
      case EntityTypes.WateringCanWooden:
      case EntityTypes.WateringCanCopper:
      case EntityTypes.WateringCanSteel:
        tool = new WateringCan(config)
        break
    }
  
    tool.init()
  
    return tool
  }

  getFurniture (element, type) {
    const config = {
      game: element.game,
      imageManager: element.imageManager,
      type,
      x: element.x + element.width - element.itemWidth - 8,
      y: element.y + 8,
      width: element.itemWidth,
      height: element.itemHeight,
      quantity: 1
    }
  
    const furniture = new Furniture(config)
    furniture.init()
  
    return furniture
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
    case 'gift':
      element.sourceX = StoreUIData.GiftItem.x
      element.sourceY = StoreUIData.GiftItem.y
      element.sourceWidth = StoreUIData.GiftItem.width
      element.sourceHeight = StoreUIData.GiftItem.height
  }
}