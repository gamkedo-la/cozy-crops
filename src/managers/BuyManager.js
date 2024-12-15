import Constants from '../globals/Constants.js'
import Colors from '../globals/Colors.js'
import Keys from '../globals/Keys.js'
import UIAttributes from '../globals/UIAttributes.js'
import { UISprites, StoreUI } from '../globals/Images.js'
import EntityTypes from '../globals/EntityTypes.js'
import UISpriteData from '../globals/UISpriteData.js'
import StoreUIData from '../globals/StoreUIData.js'
import { FamilyNames } from '../globals/Fonts.js'
import BuyButton from '../uiElements/BuyButton.js'
import CancelButton from '../uiElements/CancelButton.js'
import BuyItemElement from '../uiElements/BuyItemElement.js'

export default class BuyManager {
  constructor (config) {
    Object.assign(this, config)

    this.purchasableItems = []
  }

  init () {
    const config = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager
    }
    this.purchasableItems.push(new BuyItemElement({
      ...config,
      selected: true, // make false for subsequent items
      type: EntityTypes.LettuceSeed,
      y: this.dialogRect.top + 6
    }))

    this.purchasableItems.push(new BuyItemElement({
      ...config,
      selected: false,
      type: EntityTypes.TomatoSeed,
      y: this.dialogRect.top + 2 * StoreUIData.BuyItem.height + 6
    }))

    this.purchasableItems.forEach(item => item.init())
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
  drawBackgroundForItemCount(manager, dialogBkgdRect, 1)

  drawItemsWhichCanBeBought(manager, dialogBkgdRect)

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

  // TODO: Will need to duplicate the middle depending on how many items are available to buy
  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    StoreUIData.BuyBackgroundMiddle.x,
    StoreUIData.BuyBackgroundMiddle.y,
    StoreUIData.BuyBackgroundMiddle.width,
    StoreUIData.BuyBackgroundMiddle.height,
    manager.game.canvas.width / 2 - StoreUIData.BuyBackgroundMiddle.width,
    dialogBkgdRect.top + StoreUIData.BuyBackgroundTop.height,
    2 * StoreUIData.BuyBackgroundMiddle.width,
    2 * StoreUIData.BuyBackgroundMiddle.height
  )

  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    StoreUIData.BuyBackgroundBottom.x,
    StoreUIData.BuyBackgroundBottom.y,
    StoreUIData.BuyBackgroundBottom.width,
    StoreUIData.BuyBackgroundBottom.height,
    manager.game.canvas.width / 2 - StoreUIData.BuyBackgroundBottom.width,
    dialogBkgdRect.top + StoreUIData.BuyBackgroundTop.height + StoreUIData.BuyBackgroundMiddle.height,
    2 * StoreUIData.BuyBackgroundBottom.width,
    2 * StoreUIData.BuyBackgroundBottom.height
  )
}

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
  manager.purchasableItems.forEach(item => item.draw())
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