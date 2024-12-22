import Keys from '../globals/Keys.js'
import UIAttributes from '../globals/UIAttributes.js'
import EntityTypes from '../globals/EntityTypes.js'
import UISpriteData from '../globals/UISpriteData.js'
import { StoreUI } from '../globals/Images.js'
import StoreUIData from '../globals/StoreUIData.js'
import { FamilyNames } from '../globals/Fonts.js'
import BuyItemElement from '../uiElements/BuyItemElement.js'
import CropData from '../globals/CropData.js'
import TreeData from '../globals/TreeData.js'
import NextButton from '../uiElements/NextButton.js'
import PreviousButton from '../uiElements/PreviousButton.js'
import StoreConfirmation from '../uiElements/StoreConfirmation.js'

export default class BuyManager {
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
    this.pages[this.currentPageIndex][this.selectedItemIndex].selected = false

    this.currentPageIndex = (this.currentPageIndex + 1) % this.pages.length
    this.selectedItemIndex = 0
    this.pages[this.currentPageIndex][this.selectedItemIndex].selected = true

    setButtonDisabled(this)
    positionButtons(this)
  }

  showPreviousPage () {
    this.pages[this.currentPageIndex][this.selectedItemIndex].selected = false

    this.currentPageIndex = (this.currentPageIndex - 1 + this.pages.length) % this.pages.length
    this.selectedItemIndex = 0
    this.pages[this.currentPageIndex][this.selectedItemIndex].selected = true

    setButtonDisabled(this)
    positionButtons(this)
  }

  hideStoreConfirmation () {
    this.storeConfirmation = null
  }

  completePurchase () {
    const items = this.pages[this.currentPageIndex]
    const selectedItem = items[this.selectedItemIndex]

    if (selectedItem.price <= this.scene.gameManager.getMoney()) {
      this.scene.gameManager.setMoney(this.scene.gameManager.getMoney() - (selectedItem.price * this.storeConfirmation.quantity))
      this.scene.inventoryManager.addItemToInventory(selectedItem.getPurchasedItem(), this.storeConfirmation.quantity)
    }

    this.storeConfirmation = null
  }

  cancelPurchase () {
    this.storeConfirmation = null
  }

  draw () {
    if (this.storeConfirmation) {
      this.storeConfirmation.draw()
    } else {
      drawDialogue(this, this.dialogRect)
    }
  }
}

function drawDialogue (manager, dialogBkgdRect) {
  drawCurrentPage(manager, dialogBkgdRect)
}

function setStoreShopType (manager, config) {
  manager.pages = [
    [], // crops
    [] // trees
  ]
  manager.pageTitles = [
    'Buy Crop Seeds',
    'Buy Tree Seeds'
  ]

  manager.itemContainer = StoreUIData.StoreItem
  manager.backgroundTop = StoreUIData.StoreBackgroundTop
  manager.backgroundMiddle = StoreUIData.StoreBackgroundMiddle
  manager.backgroundBottom = StoreUIData.StoreBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height

  initializeStorePage0(manager, config)
  initializeStorePage1(manager, config)

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
    'Buy Base Tools',
    'Buy Upgraded Tools',
    'Buy Premium Tools'
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
    'Buy Furniture',
    'Buy Upgraded Furniture',
    'Buy Premium Furniture'
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

  config.shopType = 'store'

  const carrot = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.CarrotSeed,
    name: 'Carrot Seeds',
    price: CropData[EntityTypes.Carrot].seedPrice,
    y: currentY
  })
  carrot.init()
  manager.pages[0].push(carrot)

  currentY += deltaY

  const corn = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.CornSeed,
    name: 'Corn Seeds',
    price: CropData[EntityTypes.Corn].seedPrice,
    y: currentY
  })
  corn.init()
  manager.pages[0].push(corn)

  currentY += deltaY

  const eggplant = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.EggplantSeed,
    name: 'Eggplant Seeds',
    price: CropData[EntityTypes.Eggplant].seedPrice,
    y: currentY
  })
  eggplant.init()
  manager.pages[0].push(eggplant)

  currentY += deltaY

  const lettuce = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.LettuceSeed,
    name: 'Lettuce Seeds',
    price: CropData[EntityTypes.Lettuce].seedPrice,
    y: currentY
  })
  lettuce.init()
  manager.pages[0].push(lettuce)

  currentY += deltaY

  const onion = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.OnionSeed,
    name: 'Onion Seeds',
    price: CropData[EntityTypes.Onion].seedPrice,
    y: currentY
  })
  onion.init()
  manager.pages[0].push(onion)

  currentY += deltaY

  const pepper = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PepperSeed,
    name: 'Pepper Seeds',
    price: CropData[EntityTypes.Pepper].seedPrice,
    y: currentY
  })
  pepper.init()
  manager.pages[0].push(pepper)

  currentY += deltaY

  const potato = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PotatoSeed,
    name: 'Potato Seeds',
    price: CropData[EntityTypes.Potato].seedPrice,
    y: currentY
  })
  potato.init()
  manager.pages[0].push(potato)

  currentY += deltaY

  const pumpkin = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PumpkinSeed,
    name: 'Pumpkin Seeds',
    price: CropData[EntityTypes.Pumpkin].seedPrice,
    y: currentY
  })
  pumpkin.init()
  manager.pages[0].push(pumpkin)

  currentY += deltaY

  const radish = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.RadishSeed,
    name: 'Radish Seeds',
    price: CropData[EntityTypes.Radish].seedPrice,
    y: currentY
  })
  radish.init()
  manager.pages[0].push(radish)

  currentY += deltaY

  const strawberry = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.StrawberrySeed,
    name: 'Strawberry Seeds',
    price: CropData[EntityTypes.Strawberry].seedPrice,
    y: currentY
  })
  strawberry.init()
  manager.pages[0].push(strawberry)

  currentY += deltaY

  const tomato = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.TomatoSeed,
    name: 'Tomato Seeds',
    price: CropData[EntityTypes.Tomato].seedPrice,
    y: currentY
  })
  tomato.init()
  manager.pages[0].push(tomato)

  currentY += deltaY

  const watermelon = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.WatermelonSeed,
    name: 'Watermelon Seeds',
    price: CropData[EntityTypes.Watermelon].seedPrice,
    y: currentY
  })
  watermelon.init()
  manager.pages[0].push(watermelon)

  if (manager.currentPageIndex === 0) {
    manager.pages[0][manager.selectedItemIndex].selected = true
  }


}

function initializeStorePage1 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'store'

  const apple = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.AppleSeed,
    name: 'Apple Tree Seeds',
    price: TreeData[EntityTypes.AppleTree].seedPrice,
    y: currentY
  })
  apple.init()
  manager.pages[1].push(apple)

  currentY += deltaY

  const orange = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.OrangeSeed,
    name: 'Orange Tree Seeds',
    price: TreeData[EntityTypes.OrangeTree].seedPrice,
    y: currentY
  })
  orange.init()
  manager.pages[1].push(orange)

  currentY += deltaY

  const lime = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.LimeSeed,
    name: 'Lime Tree Seeds',
    price: TreeData[EntityTypes.LimeTree].seedPrice,
    y: currentY
  })
  lime.init()
  manager.pages[1].push(lime)

  currentY += deltaY

  const cherry = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.CherrySeed,
    name: 'Cherry Tree Seeds',
    price: TreeData[EntityTypes.CherryTree].seedPrice,
    y: currentY
  })
  cherry.init()
  manager.pages[1].push(cherry)

  currentY += deltaY

  const lemon = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.LemonSeed,
    name: 'Lemon Tree Seeds',
    price: TreeData[EntityTypes.LemonTree].seedPrice,
    y: currentY
  })
  lemon.init()
  manager.pages[1].push(lemon)

  currentY += deltaY

  const maple = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.MapleSeed,
    name: 'Maple Tree Seeds',
    price: TreeData[EntityTypes.MapleTree].seedPrice,
    y: currentY
  })
  maple.init()
  manager.pages[1].push(maple)

  currentY += deltaY

  const oak = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.OakSeed,
    name: 'Oak Tree Seeds',
    price: TreeData[EntityTypes.OakTree].seedPrice,
    y: currentY
  })
  oak.init()
  manager.pages[1].push(oak)

  currentY += deltaY

  const pine = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PineSeed,
    name: 'Pine Tree Seeds',
    price: TreeData[EntityTypes.PineTree].seedPrice,
    y: currentY
  })
  pine.init()
  manager.pages[1].push(pine)

  currentY += deltaY

  const plum = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PlumSeed,
    name: 'Plum Tree Seeds',
    price: TreeData[EntityTypes.PlumTree].seedPrice,
    y: currentY
  })
  plum.init()
  manager.pages[1].push(plum)
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
  const numMiddleSections = 2 + Math.ceil((pageLength - manager.backgroundTop.height - manager.backgroundBottom.height) / manager.backgroundMiddle.height)

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
  if (manager.storeConfirmation) {
    manageStoreConfirmationInput(manager, justDownKeys, controls)
  } else {
    manageBuyDialogueInput(manager, justDownKeys, controls)
  }
}

function  manageStoreConfirmationInput (manager, justDownKeys, controls) {
  if (justDownKeys.includes(Keys.ESCAPE)) {
    manager.storeConfirmation = null
  }
}

function manageBuyDialogueInput (manager, justDownKeys, controls) {
  if (justDownKeys.includes(Keys.ESCAPE)) {
    manager.scene.hideBuyDialogue()
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
      maxQuantity: 99,
      buy: true
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
