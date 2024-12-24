import Keys from '../globals/Keys.js'
import UIAttributes from '../globals/UIAttributes.js'
import EntityTypes from '../globals/EntityTypes.js'
import UISpriteData from '../globals/UISpriteData.js'
import StoreUIData from '../globals/StoreUIData.js'
import { StoreUI } from '../globals/Images.js'
import { FamilyNames } from '../globals/Fonts.js'
import SellItemElement from '../uiElements/SellItemElement.js'
import CropData from '../globals/CropData.js'
import TreeData from '../globals/TreeData.js'
import NextButton from '../uiElements/NextButton.js'
import PreviousButton from '../uiElements/PreviousButton.js'
import StoreConfirmation from '../uiElements/StoreConfirmation.js'

export default class SellManager {
  constructor (config) {
    Object.assign(this, config)

    this.pages = []
    this.pageTitles = []

    this.currentPageIndex = 0
    this.selectedItemIndex = 0

    this.nextButton = null
    this.prevButton = null

    this.pageTitleHeight = 0

    this.shopType = null
    this.storeConfirmation = null
    this.itemContainer = null
    this.backgroundTop = null
    this.backgroundMiddle = null
    this.backgroundBottom = null
  }

  init () {
    const config = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      entityManager: this.entityManager
    }

    this.nextButton = new NextButton({
      ...config,
      scene: this,
      x: 0,
      y: 0
    })

    this.prevButton = new PreviousButton({
      ...config,
      scene: this,
      x: 0,
      y: 0
    })
    this.prevButton.setDisabled(true)
  }

  setShopType (shopType) {
    this.shopType = shopType

    const config = {
      game: this.game,
      scene: this.scene,
      manager: this,
      imageManager: this.imageManager,
      entityManager: this.entityManager
    }

    switch (this.shopType) {
      case 'store':
        setStoreShopType(this, config)
        break
      case 'blacksmithshop':
        setBlacksmithShopType(this, config)
        break
      case 'carpentryshop':
        setCarpentryShopType(this, config)
        break
    }

    setButtonDisabled(this)
    positionButtons(this)
  }

  update (deltaTime, mousePos) {
    if (mousePos?.justDown) checkMouseClick(this, mousePos.x, mousePos.y)

    manageInput(this)
  }

  showNextPage () {
    if (this.pages[this.currentPageIndex][this.selectedItemIndex]) this.pages[this.currentPageIndex][this.selectedItemIndex].selected = false

    this.currentPageIndex = (this.currentPageIndex + 1) % this.pages.length
    this.selectedItemIndex = 0
    if (this.pages[this.currentPageIndex][this.selectedItemIndex]) this.pages[this.currentPageIndex][this.selectedItemIndex].selected = true

    setButtonDisabled(this)
    positionButtons(this)
  }

  showPreviousPage () {
    if (this.pages[this.currentPageIndex][this.selectedItemIndex]) this.pages[this.currentPageIndex][this.selectedItemIndex].selected = false

    this.currentPageIndex = (this.currentPageIndex - 1 + this.pages.length) % this.pages.length
    this.selectedItemIndex = 0
    if (this.pages[this.currentPageIndex][this.selectedItemIndex]) this.pages[this.currentPageIndex][this.selectedItemIndex].selected = true

    setButtonDisabled(this)
    positionButtons(this)
  }

  hideStoreConfirmation () {
    this.storeConfirmation = null
  }

  completeSale () {
    const items = this.pages[this.currentPageIndex]
    const selectedItem = items[this.selectedItemIndex]

    this.scene.gameManager.setMoney(this.scene.gameManager.getMoney() + (selectedItem.price * this.storeConfirmation.quantity))
    this.scene.inventoryManager.removeItemFromInventory(selectedItem.getSoldItem(), this.storeConfirmation.quantity)

    this.storeConfirmation = null
    this.setShopType(this.shopType)
  }

  cancelSale () {
    this.storeConfirmation = null
  }

  draw () {
    if (this.storeConfirmation) {
      this.storeConfirmation.draw()
    } else {
      drawDialogue(this, this.dialogRect)
    }  }
}

function drawDialogue (manager, dialogBkgdRect) {
  drawCurrentPage(manager, dialogBkgdRect)
}

function setStoreShopType (manager, config) {
  manager.pages = [
    [], // crops
    [], // trees
    [] // forage items
  ]
  manager.pageTitles = [
    'Sell Crops',
    'Sell Tree Fruit',
    'Sell Forage Items'
  ]

  manager.itemContainer = StoreUIData.StoreItem
  manager.backgroundTop = StoreUIData.StoreBackgroundTop
  manager.backgroundMiddle = StoreUIData.StoreBackgroundMiddle
  manager.backgroundBottom = StoreUIData.StoreBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height

  initializeStorePage0(manager, config)
  initializeStorePage1(manager, config)
  initializeStorePage2(manager, config)

  manager.prevButton.x = manager.game.canvas.width / 2 - manager.backgroundTop.width + 10
  manager.nextButton.x = manager.game.canvas.width / 2 + manager.backgroundTop.width - (2 * UISpriteData.NextButtonSmall.width) - 10
}

function setBlacksmithShopType (manager, config) {
  manager.pages = [
    [], // base tools
    [], // upgraded tools
    [] // premium tools
  ]
  manager.pageTitles = [
    'Sell Base Tools',
    'Sell Upgraded Tools',
    'Sell Premium Tools'
  ]

  manager.itemContainer = StoreUIData.BlacksmithItem
  manager.backgroundTop = StoreUIData.BlacksmithBackgroundTop
  manager.backgroundMiddle = StoreUIData.BlacksmithBackgroundMiddle
  manager.backgroundBottom = StoreUIData.BlacksmithBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height

  initializeBlacksmithPage0(manager, config)
  initializeBlacksmithPage1(manager, config)
  initializeBlacksmithPage2(manager, config)

  manager.prevButton.x = manager.game.canvas.width / 2 - manager.backgroundTop.width + 10
  manager.nextButton.x = manager.game.canvas.width / 2 + manager.backgroundTop.width - (2 * UISpriteData.NextButtonSmall.width) - 10
}

function setCarpentryShopType (manager, config) {
  manager.pages = [
    [], // furniture
    [], // upgraded furniture
    [] // premium furniture
  ]
  manager.pageTitles = [
    'Sell Furniture',
    'Sell Upgraded Furniture',
    'Sell Premium Furniture'
  ]

  manager.itemContainer = StoreUIData.CarpentryItem
  manager.backgroundTop = StoreUIData.CarpentryBackgroundTop
  manager.backgroundMiddle = StoreUIData.CarpentryBackgroundMiddle
  manager.backgroundBottom = StoreUIData.CarpentryBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height

  initializeCarpentryPage0(manager, config)
  initializeCarpentryPage1(manager, config)
  initializeCarpentryPage2(manager, config)

  manager.prevButton.x = manager.game.canvas.width / 2 - manager.backgroundTop.width + 10
  manager.nextButton.x = manager.game.canvas.width / 2 + manager.backgroundTop.width - (2 * UISpriteData.NextButtonSmall.width) - 10
}

function initializeStorePage0 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  const crops = manager.inventoryManager.getCrops()
  crops.forEach(crop => {
    const cropData = CropData[crop.type]
    const item = new SellItemElement({
      ...config,
      x: manager.game.canvas.width / 2 - manager.itemContainer.width,
      y: currentY,
      type: crop.type,
      name: cropData.name,
      price: cropData.sellingPrice,
      selected: false,
      shopType: manager.shopType,
      cropManager: manager.scene.cropManager
    })
    item.init()
    manager.pages[0].push(item)
    if (manager.pages[0].length === 1) item.selected = true
    currentY += deltaY
  })
}

function initializeStorePage1 (manager, config) {
  config.shopType = 'store'
}

function initializeStorePage2 (manager, config) {
  config.shopType = 'store'
}

function initializeBlacksmithPage0 (manager, config) {
  config.shopType = 'blacksmithshop'
}

function initializeBlacksmithPage1 (manager, config) {
  config.shopType = 'blacksmithshop'
}

function initializeBlacksmithPage2 (manager, config) {
  config.shopType = 'blacksmithshop'
}

function initializeCarpentryPage0 (manager, config) {
  config.shopType = 'carpentryshop'
}

function initializeCarpentryPage1 (manager, config) {
  config.shopType = 'carpentryshop'
}

function initializeCarpentryPage2 (manager, config) {
  config.shopType = 'carpentryshop'
}

function drawCurrentPage (manager, dialogBkgdRect) {
  drawBackgroundForItemCount(manager, dialogBkgdRect, manager.pages[manager.currentPageIndex].length)
  drawPageTitle(manager, dialogBkgdRect)
  drawItemsOnCurrentPage(manager)
  drawButtons(manager)
}

function drawBackgroundForItemCount (manager, dialogBkgdRect, itemCount) {
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
  
  const pageLength = itemCount * (manager.itemContainer.height + 4) // + 4 accounts for spacing between items
  // add one section to make room for buttons at the bottom, add one section for the page title at the top
  const numMiddleSections = 3 + Math.ceil((pageLength - manager.backgroundTop.height - manager.backgroundBottom.height) / manager.backgroundMiddle.height)

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

function drawPageTitle (manager, dialogBkgdRect) {
  manager.game.ctx.fillStyle = 'black'
  manager.game.ctx.font = `48px ${FamilyNames.FarmVintage}`
  manager.game.ctx.textAlign = UIAttributes.CenterAlign
  manager.game.ctx.fillText(manager.pageTitles[manager.currentPageIndex], manager.game.canvas.width / 2, dialogBkgdRect.top + 36)
}

function drawItemsOnCurrentPage (manager) {
  const items = manager.pages[manager.currentPageIndex]
  items.forEach(item => item.draw())
}

function drawButtons (manager) {
  manager.nextButton.draw()
  manager.prevButton.draw()
}

function checkMouseClick (manager, x, y) {
  if (manager.storeConfirmation) {
    manager.storeConfirmation.checkClicked(x, y)
  } else {
    manager.nextButton.checkClicked(x, y)
    manager.prevButton.checkClicked(x, y)
  }
}

function manageInput (manager) {
  const justDownKeys = manager.scene.inputManager.getJustDownKeys()
  const controls  = manager.scene.gameManager.getPlayerControls(EntityTypes.Player1)
  if (justDownKeys.includes(Keys.ESCAPE)) {
    manager.scene.hideSellDialogue()
  } else if (justDownKeys.includes(controls.Action)) {
        const items = manager.pages[manager.currentPageIndex]
        const selectedItem = items[manager.selectedItemIndex]
    
        const config = {
          game: manager.game,
          scene: manager.scene,
          manager,
          imageManager: manager.imageManager,
          entityManager: manager.entityManager,
          itemPrice: selectedItem.price,
          itemName: selectedItem.name,
          dialogRect: manager.dialogRect,
          maxQuantity: manager.inventoryManager.getQuantity(selectedItem),
          buy: false
        }
    
        manager.storeConfirmation = new StoreConfirmation(config)
        manager.storeConfirmation.init()
        manager.storeConfirmation.setShopType(manager.shopType)
  } else if (justDownKeys.includes(Keys.ARROW_RIGHT) || justDownKeys.includes(Keys.ARROW_DOWN)) {
    selectNextItem(manager)
  } else if (justDownKeys.includes(Keys.ARROW_LEFT) || justDownKeys.includes(Keys.ARROW_UP)) {
    selectPreviousItem(manager)
  }
}

function setButtonDisabled (manager) {
  if (manager.currentPageIndex === 0) {
    manager.prevButton.setDisabled(true)
  } else {
    manager.prevButton.setDisabled(false)
  }

  if (manager.currentPageIndex === manager.pages.length - 1) {
    manager.nextButton.setDisabled(true)
  } else {
    manager.nextButton.setDisabled(false)
  }
}

function positionButtons (manager) {
  const buttonYPos = manager.pageTitleHeight + manager.pages[manager.currentPageIndex].length * 2 * manager.itemContainer.height + 10
  manager.nextButton.setPosition(manager.nextButton.x, buttonYPos)
  manager.prevButton.setPosition(manager.prevButton.x, buttonYPos)
}

function selectNextItem (manager) {
  const items = manager.pages[manager.currentPageIndex]
  items[manager.selectedItemIndex].selected = false
  manager.selectedItemIndex = (manager.selectedItemIndex + 1) % items.length
  items[manager.selectedItemIndex].selected = true
}

function selectPreviousItem (manager) {
  const items = manager.pages[manager.currentPageIndex]
  items[manager.selectedItemIndex].selected = false
  manager.selectedItemIndex = (manager.selectedItemIndex - 1 + items.length) % items.length
  items[manager.selectedItemIndex].selected = true
}
