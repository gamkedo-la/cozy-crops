import Constants from '../globals/Constants.js'
import Colors from '../globals/Colors.js'
import Keys, { E } from '../globals/Keys.js'
import UIAttributes from '../globals/UIAttributes.js'
import { UISprites, StoreUI } from '../globals/Images.js'
import EntityTypes from '../globals/EntityTypes.js'
import UISpriteData from '../globals/UISpriteData.js'
import StoreUIData from '../globals/StoreUIData.js'
import { FamilyNames } from '../globals/Fonts.js'
import BuyButton from '../uiElements/BuyButton.js'
import CancelButton from '../uiElements/CancelButton.js'
import BuyItemElement from '../uiElements/BuyItemElement.js'
import CropData from '../globals/CropData.js'

export default class BuyManager {
  constructor (config) {
    Object.assign(this, config)

    this.pages = [
      [], // crops
      [], // trees
      [], // base tools
      [], // upgraded tools
      [], // premium tools
      [], // furniture
      [], // upgraded furniture
      [] // premium furniture
    ]

    this.pageTitles = [
      'Crop Seeds',
      'Tree Seeds',
      'Base Tools',
      'Upgraded Tools',
      'Premium Tools',
      'Furniture',
      'Upgraded Furniture',
      'Premium Furniture'
    ]

    this.currentPageIndex = 0
  }

  init () {
    const config = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      entityManager: this.entityManager
    }

    initializePage0(this, config)
    // initializePage1(this, config)
    // initializePage2(this, config)
    // initializePage3(this, config)
    // initializePage4(this, config)
    // initializePage5(this, config)
    // initializePage6(this, config)
    // initializePage7(this, config)
  }

  update (deltaTime, mousePos) {
    if (mousePos?.justDown) checkMouseClick(this, mousePos.x, mousePos.y)

    manageInput(this)
  }

  draw () {
    drawDialogue(this, this.dialogRect)
  }
}

function drawDialogue (manager, dialogBkgdRect) {
  drawCurrentPage(manager, dialogBkgdRect)
  // drawBackgroundForItemCount(manager, dialogBkgdRect, 1)

  // drawItemsWhichCanBeBought(manager, dialogBkgdRect)

  manager.game.ctx.fillStyle = 'black'
  manager.game.ctx.font = `48px ${FamilyNames.FarmVintage}`
  manager.game.ctx.textAlign = UIAttributes.CenterAlign
  // const textLines = scene.dialogue.split('\n')

  // let lineY = dialogBkgdRect.top + 30
  // for (const line of textLines) {
  //   manager.game.ctx.fillText(line, manager.game.canvas.width / 2, lineY)
  //   lineY += 30
  // }

  // if (scene.showGiveButton) {
  //   scene.giftButton.draw()
  // }
}

function initializePage0 (manager, config) {
  let currentY = manager.dialogRect.top + 6 + 2 * StoreUIData.BuyBackgroundTop.height
  const deltaY = 2 * StoreUIData.BuyItem.height

  // const apple = new BuyItemElement({
  //   ...config,
  //   selected: true, // make false for subsequent items
  //   type: EntityTypes.AppleSeed,
  //   y: currentY
  // })
  // apple.init()
  // manager.pages[0].push(apple)

  // currentY += deltaY

  const carrot = new BuyItemElement({
    ...config,
    selected: true, // make false for subsequent items
    type: EntityTypes.CarrotSeed,
    price: CropData[EntityTypes.Carrot].seedPrice,
    y: currentY
  })
  carrot.init()
  manager.pages[0].push(carrot)

  currentY += deltaY

  // const cherry = new BuyItemElement({
  //   ...config,
  //   selected: false, // make false for subsequent items
  //   type: EntityTypes.CherrySeed,
  //   y: currentY
  // })
  // cherry.init()
  // manager.pages[0].push(cherry)

  // currentY += deltaY

  const corn = new BuyItemElement({
    ...config,
    selected: false, // make false for subsequent items
    type: EntityTypes.CornSeed,
    price: CropData[EntityTypes.Corn].seedPrice,
    y: currentY
  })
  corn.init()
  manager.pages[0].push(corn)

  currentY += deltaY

  const eggplant = new BuyItemElement({
    ...config,
    selected: false, // make false for subsequent items
    type: EntityTypes.EggplantSeed,
    price: CropData[EntityTypes.Eggplant].seedPrice,
    y: currentY
  })
  eggplant.init()
  manager.pages[0].push(eggplant)

  currentY += deltaY

  const lettuce = new BuyItemElement({
    ...config,
    selected: false, // make false for subsequent items
    type: EntityTypes.LettuceSeed,
    price: CropData[EntityTypes.Lettuce].seedPrice,
    y: currentY
  })
  lettuce.init()
  manager.pages[0].push(lettuce)

  currentY += deltaY

  const onion = new BuyItemElement({
    ...config,
    selected: false, // make false for subsequent items
    type: EntityTypes.OnionSeed,
    price: CropData[EntityTypes.Onion].seedPrice,
    y: currentY
  })
  onion.init()
  manager.pages[0].push(onion)

  currentY += deltaY

  const pepper = new BuyItemElement({
    ...config,
    selected: false, // make false for subsequent items
    type: EntityTypes.PepperSeed,
    price: CropData[EntityTypes.Pepper].seedPrice,
    y: currentY
  })
  pepper.init()
  manager.pages[0].push(pepper)

  currentY += deltaY

  const potato = new BuyItemElement({
    ...config,
    selected: false, // make false for subsequent items
    type: EntityTypes.PotatoSeed,
    price: CropData[EntityTypes.Potato].seedPrice,
    y: currentY
  })
  potato.init()
  manager.pages[0].push(potato)

  currentY += deltaY

  const pumpkin = new BuyItemElement({
    ...config,
    selected: false, // make false for subsequent items
    type: EntityTypes.PumpkinSeed,
    price: CropData[EntityTypes.Pumpkin].seedPrice,
    y: currentY
  })
  pumpkin.init()
  manager.pages[0].push(pumpkin)

  currentY += deltaY

  const radish = new BuyItemElement({
    ...config,
    selected: false, // make false for subsequent items
    type: EntityTypes.RadishSeed,
    price: CropData[EntityTypes.Radish].seedPrice,
    y: currentY
  })
  radish.init()
  manager.pages[0].push(radish)

  currentY += deltaY

  const strawberry = new BuyItemElement({
    ...config,
    selected: false, // make false for subsequent items
    type: EntityTypes.StrawberrySeed,
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
    price: CropData[EntityTypes.Watermelon].seedPrice,
    y: currentY
  })
  watermelon.init()
  manager.pages[0].push(watermelon)
}

function drawCurrentPage (manager, dialogBkgdRect) {
  drawBackgroundForItemCount(manager, dialogBkgdRect, manager.pages[manager.currentPageIndex].length)
  drawPageTitle(manager, dialogBkgdRect)
  drawItemsOnCurrentPage(manager, dialogBkgdRect)
  drawButtons(manager, dialogBkgdRect)
}

function drawBackgroundForItemCount (manager, dialogBkgdRect, itemCount) {
  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    StoreUIData.BuyBackgroundTop.x,
    StoreUIData.BuyBackgroundTop.y,
    StoreUIData.BuyBackgroundTop.width,
    StoreUIData.BuyBackgroundTop.height,
    manager.game.canvas.width / 2 - StoreUIData.BuyBackgroundTop.width,
    dialogBkgdRect.top,
    2 * StoreUIData.BuyBackgroundTop.width,
    2 * StoreUIData.BuyBackgroundTop.height
  )
  
  const pageLength = itemCount * (StoreUIData.BuyItem.height + 4) // + 4 accounts for spacing between items
  // add one section to make room for buttons at the bottom, add one section for the page title at the top
  const numMiddleSections = 2 + Math.ceil((pageLength - StoreUIData.BuyBackgroundTop.height - StoreUIData.BuyBackgroundBottom.height) / StoreUIData.BuyBackgroundMiddle.height)

  let currentY = dialogBkgdRect.top + StoreUIData.BuyBackgroundTop.height
  for (let i = 0; i < numMiddleSections; i++) {
    manager.game.ctx.drawImage(
      manager.imageManager.getImageWithSrc(StoreUI),
      StoreUIData.BuyBackgroundMiddle.x,
      StoreUIData.BuyBackgroundMiddle.y,
      StoreUIData.BuyBackgroundMiddle.width,
      StoreUIData.BuyBackgroundMiddle.height,
      manager.game.canvas.width / 2 - StoreUIData.BuyBackgroundMiddle.width,
      currentY,
      2 * StoreUIData.BuyBackgroundMiddle.width,
      2 * StoreUIData.BuyBackgroundMiddle.height
    )

    currentY += 2 * (StoreUIData.BuyBackgroundMiddle.height - 2 * StoreUIData.BuyBackgroundMiddle.padding)
  }

  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    StoreUIData.BuyBackgroundBottom.x,
    StoreUIData.BuyBackgroundBottom.y,
    StoreUIData.BuyBackgroundBottom.width,
    StoreUIData.BuyBackgroundBottom.height,
    manager.game.canvas.width / 2 - StoreUIData.BuyBackgroundBottom.width,
    currentY,
    2 * StoreUIData.BuyBackgroundBottom.width,
    2 * StoreUIData.BuyBackgroundBottom.height
  )
}

function drawPageTitle (manager, dialogBkgdRect) {
  manager.game.ctx.fillStyle = 'black'
  manager.game.ctx.font = `48px ${FamilyNames.FarmVintage}`
  manager.game.ctx.textAlign = UIAttributes.CenterAlign
  manager.game.ctx.fillText(manager.pageTitles[manager.currentPageIndex], manager.game.canvas.width / 2, dialogBkgdRect.top + 36)
}

function drawItemsOnCurrentPage (manager, dialogBkgdRect) {
  const items = manager.pages[manager.currentPageIndex]
  items.forEach(item => item.draw())
}

function drawButtons (manager, dialogBkgdRect) {}

function drawItemsWhichCanBeBought (manager, dialogBkgdRect) {
  // TODO: Just drawing a single empty item for now
  // manager.game.ctx.drawImage(
  //   manager.imageManager.getImageWithSrc(StoreUI),
  //   StoreUIData.BuyItem.x,
  //   StoreUIData.BuyItem.y,
  //   StoreUIData.BuyItem.width,
  //   StoreUIData.BuyItem.height,
  //   manager.game.canvas.width / 2 - StoreUIData.BuyItem.width,
  //   dialogBkgdRect.top,
  //   2 * StoreUIData.BuyItem.width,
  //   2 * StoreUIData.BuyItem.height
  // )
  manager.purchaseableCrops.forEach(item => item.draw())
}

function checkMouseClick (manager, x, y) {
  // const clickedInventoryItem = manager.scene.inventoryManager.getClickedItem(x, y)
  // if (clickedInventoryItem) {
  //   manager.scene.gameScene.handleInventoryItemClick(clickedInventoryItem)
  //   manager.scene.inventoryManager.setSelectedItem(clickedInventoryItem)
  // } else if (manager.scene.showGiveButton && manager.scene.giftButton.checkClicked(x, y)) {
  //   manager.scene.giftButton.activate()
  // }
  console.log('checkMouseClick')
}

function manageInput (manager) {
  const downKeys = manager.scene.inputManager.getDownKeys()

  if (downKeys.includes(Keys.ESCAPE)) {
    manager.scene.hideBuyDialogue()
  }

  const justDownKeys = manager.scene.inputManager.getJustDownKeys()
  // if (justDownKeys.includes(Keys.N)) {

  // }
}