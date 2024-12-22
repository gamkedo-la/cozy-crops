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

export default class SellManager {
  constructor (config) {
    Object.assign(this, config)

    this.pages = []
    this.pageTitles = []

    this.currentPageIndex = 0
    this.selectedItemIndex = 0

    this.nextButton = null
    this.previousButton = null

    this.pageTitleHeight = this.dialogRect.top + 6 + 2 * StoreUIData.SellBackgroundTop.height
  }

  init () {
    // const buttonYPos = this.pageTitleHeight + this.pages[this.currentPageIndex].length * 2 * StoreUIData.SellItem.height + 10
    const config = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      entityManager: this.entityManager
    }

    this.nextButton = new NextButton({
      ...config,
      scene: this,
      x: this.game.canvas.width / 2 + StoreUIData.SellBackgroundTop.width - (2 * UISpriteData.PreviousButton.width) - 10,
      y: 0 // buttonYPos
    })

    this.prevButton = new PreviousButton({
      ...config,
      scene: this,
      x: this.game.canvas.width / 2 - StoreUIData.SellBackgroundTop.width + 10,
      y: 0 // buttonYPos
    })
    this.prevButton.setDisabled(true)
  }

  setShopType (shopType) {
    this.shopType = shopType

    const config = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      entityManager: this.entityManager
    }

    switch (this.shopType) {
      case 'store':
        this.pages = [
          [], // Crops
          [], // Tree Fruit
          [] // Forage Items
        ]
        this.pageTitles = ['Crops', 'Tree Fruit', 'Forage Items']

        initializeStorePage0(this, config)
        initializeStorePage1(this, config)
        initializeStorePage2(this, config)
        break
      case 'blacksmithshop':
        this.pages = [
          [], // Base Tools
          [], // Upgraded Tools
          [] // Premium Tools
        ]
        this.pageTitles = ['Base Tools', 'Upgraded Tools', 'Premium Tools']

        initializeBlacksmithPage0(this, config)
        initializeBlacksmithPage1(this, config)
        initializeBlacksmithPage2(this, config)
        break
      case 'carpentryshop':
        this.pages = [
          [], // Furniture
          [], // Upgraded Furniture
          [] // Premium Furniture
        ]
        this.pageTitles = ['Furniture', 'Upgraded Furniture', 'Premium Furniture']

        initializeCarpentryPage0(this, config)
        initializeCarpentryPage1(this, config)
        initializeCarpentryPage2(this, config)
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

  draw () {
    drawDialogue(this, this.dialogRect)
  }
}

function drawDialogue (manager, dialogBkgdRect) {
  drawCurrentPage(manager, dialogBkgdRect)
}

function initializeStorePage0 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * StoreUIData.BuyItem.height

  const crops = manager.inventoryManager.getCrops()
  crops.forEach(crop => {
    const cropData = CropData[crop.type]
    const item = new SellItemElement({
      ...config,
      x: manager.game.canvas.width / 2 - StoreUIData.SellItem.width,
      y: currentY,
      name: cropData.name,
      price: cropData.price,
      icon: cropData.icon,
      selected: false
    })
    item.init()
    manager.pages[0].push(item)
    currentY += deltaY
  })
}

function initializeStorePage1 (manager, config) {}

function initializeStorePage2 (manager, config) {}

function initializeBlacksmithPage0 (manager, config) {}

function initializeBlacksmithPage1 (manager, config) {}

function initializeBlacksmithPage2 (manager, config) {}

function initializeCarpentryPage0 (manager, config) {}

function initializeCarpentryPage1 (manager, config) {}

function initializeCarpentryPage2 (manager, config) {}

function drawCurrentPage (manager, dialogBkgdRect) {
  drawBackgroundForItemCount(manager, dialogBkgdRect, manager.pages[manager.currentPageIndex].length)
  drawPageTitle(manager, dialogBkgdRect)
  drawItemsOnCurrentPage(manager)
  drawButtons(manager)
}

function drawBackgroundForItemCount (manager, dialogBkgdRect, itemCount) {
  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    StoreUIData.SellBackgroundTop.x,
    StoreUIData.SellBackgroundTop.y,
    StoreUIData.SellBackgroundTop.width,
    StoreUIData.SellBackgroundTop.height,
    manager.game.canvas.width / 2 - StoreUIData.SellBackgroundTop.width,
    dialogBkgdRect.top,
    2 * StoreUIData.SellBackgroundTop.width,
    2 * StoreUIData.SellBackgroundTop.height
  )
  
  const pageLength = itemCount * (StoreUIData.SellItem.height + 4) // + 4 accounts for spacing between items
  // add one section to make room for buttons at the bottom, add one section for the page title at the top
  const numMiddleSections = 2 + Math.ceil((pageLength - StoreUIData.SellBackgroundTop.height - StoreUIData.SellBackgroundBottom.height) / StoreUIData.SellBackgroundMiddle.height)

  let currentY = dialogBkgdRect.top + StoreUIData.SellBackgroundTop.height
  for (let i = 0; i < numMiddleSections; i++) {
    manager.game.ctx.drawImage(
      manager.imageManager.getImageWithSrc(StoreUI),
      StoreUIData.SellBackgroundMiddle.x,
      StoreUIData.SellBackgroundMiddle.y,
      StoreUIData.SellBackgroundMiddle.width,
      StoreUIData.SellBackgroundMiddle.height,
      manager.game.canvas.width / 2 - StoreUIData.SellBackgroundMiddle.width,
      currentY,
      2 * StoreUIData.SellBackgroundMiddle.width,
      2 * StoreUIData.SellBackgroundMiddle.height
    )

    currentY += 2 * (StoreUIData.SellBackgroundMiddle.height - 2 * StoreUIData.SellBackgroundMiddle.padding)
  }

  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    StoreUIData.SellBackgroundBottom.x,
    StoreUIData.SellBackgroundBottom.y,
    StoreUIData.SellBackgroundBottom.width,
    StoreUIData.SellBackgroundBottom.height,
    manager.game.canvas.width / 2 - StoreUIData.SellBackgroundBottom.width,
    currentY,
    2 * StoreUIData.SellBackgroundBottom.width,
    2 * StoreUIData.SellBackgroundBottom.height
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
  manager.nextButton.checkClicked(x, y)
  manager.prevButton.checkClicked(x, y)
}

function manageInput (manager) {
  const justDownKeys = manager.scene.inputManager.getJustDownKeys()
  const controls  = manager.scene.gameManager.getPlayerControls(EntityTypes.Player1)
  if (justDownKeys.includes(Keys.ESCAPE)) {
    manager.scene.hideSellDialogue()
  } else if (justDownKeys.includes(controls.Action)) {
    const items = manager.pages[manager.currentPageIndex]
    const selectedItem = items[manager.selectedItemIndex]

    manager.scene.gameManager.setMoney(manager.scene.gameManager.getMoney() + selectedItem.price)
    manager.inventoryManager.removeItemFromInventory(selectedItem)
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
  const buttonYPos = manager.pageTitleHeight + manager.pages[manager.currentPageIndex].length * 2 * StoreUIData.SellItem.height + 10
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
