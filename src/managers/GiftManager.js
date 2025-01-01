import SellManager from './SellManager.js'
import StoreUIData from '../globals/StoreUIData.js'
import GiftItemElement from '../uiElements/GiftItemElement.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class GiftManager extends SellManager {
  constructor (config) {
    super(config)
    this.shopType = 'gift'
    this.itemsPerPage = 10
    this.pageCount = this.inventoryManager.getInventory().length / this.itemsPerPage
  }

  setShopType () {
    setGiftShopType (this, {
      game: this.game,
      scene: this.scene,
      manager: this,
      imageManager: this.imageManager,
      entityManager: this.entityManager
    })
  }
}

function setGiftShopType (manager, config) {
  manager.pages = []
  manager.pageTitles = []

  manager.itemContainer = StoreUIData.GiftItem
  manager.backgroundTop = StoreUIData.StoreBackgroundTop
  manager.backgroundMiddle = StoreUIData.StoreBackgroundMiddle
  manager.backgroundBottom = StoreUIData.StoreBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height

  for (let i = 0; i < manager.pageCount; i++) {
    manager.pages.push([])
    manager.pageTitles.push(`Page ${i + 1}`)
    initializePage(manager, i, config)
  }

  manager.prevButton.x = manager.game.canvas.width / 2 - manager.backgroundTop.width + 10
  manager.nextButton.x = manager.game.canvas.width / 2 + manager.backgroundTop.width - (2 * UISpriteData.NextButtonSmall.width) - 10

  setButtonDisabled(manager)
  positionButtons(manager)
}

function initializePage (manager, pageIndex, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'gift'

  const items = manager.inventoryManager.getInventory()
  const start = pageIndex * manager.itemsPerPage
  const end = Math.min((pageIndex + 1) * manager.itemsPerPage, items.length)

  for (let i = start; i < end; i++) {
    const item = items[i]
    const itemElement = new GiftItemElement({
      ...config,
      manager,
      x: manager.game.canvas.width / 2 - manager.itemContainer.width,
      y: currentY,
      type: item.type,
      selected: false,
      cropManager: manager.scene.cropManager
    })
    itemElement.init()
    manager.pages[pageIndex].push(itemElement)
    if (manager.pages[pageIndex].length === 1) itemElement.selected = true
    currentY += deltaY
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