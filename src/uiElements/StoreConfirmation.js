import { FamilyNames } from '../globals/Fonts.js'
import UIAttributes from '../globals/UIAttributes.js'
import UISpriteData from '../globals/UISpriteData.js'
import { UISprites, StoreUI } from '../globals/Images.js'
import StoreUIData from '../globals/StoreUIData.js'
import BuyButton from './BuyButton.js'
import SellButton from './SellButton.js'
import CancelButton from './CancelButton.js'
import MinusButton from './MinusButton.js'
import PlusButton from './PlusButton.js'
import GiftButton from './GiftButton.js'

export default class StoreConfirmation {
  constructor (config) {
    Object.assign(this, config)

    this.quantity = 1
    this.priceString = `${this.itemPrice}`.padStart(5, '0')
    this.uiSpriteSource = this.imageManager.getImageWithSrc(UISprites)

    this.buyButton = null
    this.sellButton = null
    this.cancelButton = null
    this.plusButton = null
    this.minusButton = null
    this.giftButton = null

    this.pageTitleHeight = 0

    this.shopType = null
    this.itemContainer = null
    this.backgroundTop = null
    this.backgroundMiddle = null
    this.backgroundBottom = null
    this.extendedDisplay = null
  }

  init () {
    this.buyButton = new BuyButton({
      game: this.game,
      imageManager: this.imageManager,
      x: this.x + 20,
      y: this.y + 80,
      width: 100,
      height: 20,
      scene: this
    })
    if (!this.buy) {
      this.buyButton.visible = false
    }

    this.sellButton = new SellButton({
      game: this.game,
      imageManager: this.imageManager,
      x: this.x + 20,
      y: this.y + 80,
      width: 100,
      height: 20,
      scene: this
    })
    if (this.buy) {
      this.sellButton.visible = false
    }

    this.cancelButton = new CancelButton({
      game: this.game,
      imageManager: this.imageManager,
      x: this.x + 20,
      y: this.y + 110,
      width: 100,
      height: 20,
      scene: this
    })

    this.plusButton = new PlusButton({
      game: this.game,
      imageManager: this.imageManager,
      x: this.x + 20,
      y: this.y + 20,
      width: 20,
      height: 20,
      scene: this
    })

    this.minusButton = new MinusButton({
      game: this.game,
      imageManager: this.imageManager,
      x: this.x + 20,
      y: this.y + 50,
      width: 20,
      height: 20,
      scene: this
    })

    this.giftButton = new GiftButton({
      game: this.game,
      imageManager: this.imageManager,
      x: this.x + 20,
      y: this.y + 80,
      width: 100,
      height: 20,
      scene: this
    })
    this.giftButton.visible = false
  }

  setShopType (shopType) {
    this.shopType = shopType

    setImageSourceData(this)

    this.x  = this.game.canvas.width / 2 - this.sourceWidth
    this.y = this.dialogRect.top + 6
    this.width = 2 * this.sourceWidth
    this.height = 2 * this.sourceHeight

    const config = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      entityManager: this.entityManager
    }

    switch (this.shopType) {
      case 'store':
        setStoreShopType(this)
        break
      case 'blacksmithshop':
        setBlacksmithShopType(this)
        break
      case 'carpentryshop':
        setCarpentryShopType(this)
        break
      case 'gift':
        setGiftShopType(this)
        break
    }

    if (this.shopType === 'gift') {
      this.buyButton.visible = false
      this.sellButton.visible = false
      this.giftButton.visible = true
      this.itemContainer = StoreUIData.GiftConfirmationDisplay
    } else {
      this.itemContainer = StoreUIData.ExtendedPriceDisplay
    }
    this.itemContainer.source = this.imageManager.getImageWithSrc(StoreUI)

    this.itemContainer.rect = {
      x: (this.game.canvas.width / 2) - (Math.floor(3 * this.itemContainer.width / 2)),
      y: this.dialogRect.top + Math.floor(3 * this.backgroundTop.height / 2),
      width: 3 * this.itemContainer.width,
      height: 3 * this.itemContainer.height
    }

    setButtonDisabled(this)
    positionButtons(this, this.itemContainer.rect)
  }

  checkClicked (x, y) {
    if (this.buy && this.buyButton.checkClicked(x, y)) {
      if (this.buyButton.visible && !this.buyButton.disabled) this.buyItem()
    } else if (!this.buy && this.sellButton.checkClicked(x, y)) {
      if (this.sellButton.visible && !this.sellButton.disabled) {
        this.sellItem()
      }
    } else if (this.shopType === 'gift' && this.giftButton.checkClicked(x, y)) {
      if (this.giftButton.visible && !this.giftButton.disabled) this.giveItem()
    } else if (this.cancelButton.checkClicked(x, y)) {
      if (this.buy) this.cancelPurchase()
      if (!this.buy) this.cancelSale()
    }

    this.plusButton.checkClicked(x, y)
    this.minusButton.checkClicked(x, y)
  }

  increaseQuantity () {
    this.quantity++
    if (this.quantity > this.maxQuantity) this.quantity = this.maxQuantity
    setButtonDisabled(this)
  }

  decreaseQuantity () {
    this.quantity--
    if (this.quantity < 1) this.quantity = 1
    setButtonDisabled(this)
  }

  buyItem () {
    this.manager.completePurchase()
  }

  sellItem () {
    this.manager.completeSale()
  }

  giveItem () {
    this.manager.completeGift()
  }

  cancelPurchase () {
    this.manager.cancelPurchase()
  }

  cancelSale () {
    this.manager.cancelSale()
  }

  draw () {
    drawBackground(this, this.dialogRect)
    drawItem(this, this.dialogRect)
    drawPageTitleAndQuantity(this, this.dialogRect)
    if (this.shopType !== 'gift') drawPrice(this)
    drawButtons(this)
  }
}

function drawBackground (manager, dialogBkgdRect) {
  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    manager.backgroundTop.x,
    manager.backgroundTop.y,
    manager.backgroundTop.width,
    manager.backgroundTop.height,
    manager.game.canvas.width / 2 - manager.backgroundTop.width,
    dialogBkgdRect.top,
    2 * manager.backgroundTop.width,
    2 * manager.backgroundTop.height
  )

  const numMiddleSections = 4 // 2 + Math.ceil((pageLength - manager.backgroundTop.height - manager.backgroundBottom.height) / manager.backgroundMiddle.height)

  let currentY = dialogBkgdRect.top + manager.backgroundTop.height
  for (let i = 0; i < numMiddleSections; i++) {
    manager.game.ctx.drawImage(
      manager.imageManager.getImageWithSrc(StoreUI),
      manager.backgroundMiddle.x,
      manager.backgroundMiddle.y,
      manager.backgroundMiddle.width,
      manager.backgroundMiddle.height,
      manager.game.canvas.width / 2 - manager.backgroundMiddle.width,
      currentY,
      2 * manager.backgroundMiddle.width,
      2 * manager.backgroundMiddle.height
    )

    currentY += 2 * (manager.backgroundMiddle.height - 2 * manager.backgroundMiddle.padding)
  }

  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    manager.backgroundBottom.x,
    manager.backgroundBottom.y,
    manager.backgroundBottom.width,
    manager.backgroundBottom.height,
    manager.game.canvas.width / 2 - manager.backgroundBottom.width,
    currentY,
    2 * manager.backgroundBottom.width,
    2 * manager.backgroundBottom.height
  )
}

function drawPageTitleAndQuantity (manager, dialogBkgdRect) {
    manager.game.ctx.fillStyle = 'black'
    manager.game.ctx.font = `48px ${FamilyNames.FarmVintage}`
    manager.game.ctx.textAlign = UIAttributes.CenterAlign
    manager.game.ctx.fillText(`${manager.buy ? 'Purchase' : manager.shopType === 'gift' ? 'Give' : 'Sell '}`, manager.game.canvas.width / 2, dialogBkgdRect.top + 24)
    manager.game.ctx.fillText(`${manager.itemName}s x${manager.quantity}`, manager.game.canvas.width / 2, dialogBkgdRect.top + 66)
}

function drawPrice (manager) {
  manager.priceString = `${manager.itemPrice * manager.quantity}`.padStart(5, '0')

  for (let i = 0; i < manager.priceString.length; i++) {
    let spriteData = null
    const priceDigit = manager.priceString[i]

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

    manager.game.ctx.drawImage(
      manager.uiSpriteSource,
      spriteData.x,
      spriteData.y,
      spriteData.width,
      spriteData.height,
      (manager.game.canvas.width / 2) - 50 + (i * 24),
      manager.y + 87,
      28,
      28
    )
  }
}

function drawItem (manager, dialogBkgdRect) {
  manager.game.ctx.drawImage(
    manager.itemContainer.source,
    manager.itemContainer.x,
    manager.itemContainer.y,
    manager.itemContainer.width,
    manager.itemContainer.height,
    (manager.game.canvas.width / 2) - (Math.floor(3 * manager.itemContainer.width / 2)),
    dialogBkgdRect.top + Math.floor(3 * manager.backgroundTop.height / 2),
    3 * manager.itemContainer.width,
    3 * manager.itemContainer.height
  )
}

function drawButtons (manager) {
  if (manager.buy) manager.buyButton.draw()
  if(!manager.buy && manager.shopType !== 'gift') manager.sellButton.draw()
  if (manager.shopType === 'gift') manager.giftButton.draw()
  manager.cancelButton.draw()
  manager.plusButton.draw()
  manager.minusButton.draw()
}

function setStoreShopType (manager) {
  manager.backgroundTop = StoreUIData.StoreBackgroundTop
  manager.backgroundMiddle = StoreUIData.StoreBackgroundMiddle
  manager.backgroundBottom = StoreUIData.StoreBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height
}

function setBlacksmithShopType (manager) {
  manager.backgroundTop = StoreUIData.BlacksmithBackgroundTop
  manager.backgroundMiddle = StoreUIData.BlacksmithBackgroundMiddle
  manager.backgroundBottom = StoreUIData.BlacksmithBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height
}

function setCarpentryShopType (manager) {
  manager.backgroundTop = StoreUIData.CarpentryBackgroundTop
  manager.backgroundMiddle = StoreUIData.CarpentryBackgroundMiddle
  manager.backgroundBottom = StoreUIData.CarpentryBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height
}

function setGiftShopType (manager) {
  setStoreShopType(manager)
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

function manageInput (manager) {
  const justDownKeys = manager.scene.inputManager.getJustDownKeys()
  const controls  = manager.scene.gameManager.getPlayerControls(EntityTypes.Player1)

  if (justDownKeys.includes(Keys.ESCAPE)) {
    manager.scene.hideStoreConfirmation()
  }
}

function setButtonDisabled (manager) {
  manager.minusButton.setDisabled(manager.quantity <= 1)

  if (manager.maxQuantity) {
    manager.plusButton.setDisabled(manager.quantity === manager.maxQuantity)
  } else if (manager.money) {
    manager.plusButton.setDisabled((manager.quantity + 1) * manager.itemPrice > manager.money)
  }

  if (manager.buy) {
    manager.buyButton.setDisabled(manager.quantity * manager.itemPrice > manager.money)
  } else {
    manager.sellButton.setDisabled(manager.quantity > manager.inventory)
  }
}

function positionButtons (manager, itemContainerRect) {
  manager.plusButton.setPosition(
    itemContainerRect.x + itemContainerRect.width - 2 * UISpriteData.PlusButton.width,
    itemContainerRect.y + itemContainerRect.height
  )

  manager.minusButton.setPosition(
    itemContainerRect.x,
    itemContainerRect.y + itemContainerRect.height
  )

  manager.buyButton.setPosition(
    manager.backgroundTop.x + 10,
    manager.backgroundBottom.y - manager.buyButton.height - 10
  )

  manager.sellButton.setPosition(
    manager.backgroundTop.x + 10,
    manager.backgroundBottom.y - manager.buyButton.height - 10
  )

  manager.cancelButton.setPosition(
    manager.backgroundBottom.x + manager.backgroundBottom.width - manager.cancelButton.width - 10,
    manager.backgroundBottom.y - manager.buyButton.height - 10
  )

  manager.giftButton.setPosition(
    manager.backgroundTop.x + 10,
    manager.backgroundBottom.y - manager.buyButton.height - 10
  )
}