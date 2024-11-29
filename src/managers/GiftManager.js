import Constants from '../globals/Constants.js'
import Colors from '../globals/Colors.js'
import Keys, { S } from '../globals/Keys.js'
import UIAttributes from '../globals/UIAttributes.js'
import { UISprites } from '../globals/Images.js'
import { Player1 } from '../globals/EntityTypes.js'
import UISpriteData from '../globals/UISpriteData.js'
import { FamilyNames } from '../globals/Fonts.js'
import GiftButton from '../uiElements/GiftButton.js'

export default class GiftManager {
  constructor (config) {
    Object.assign(this, config)
  }

  init () {}

  update (deltaTime, mousePos) {
    if (mousePos?.justDown) checkMouseClick(this, mousePos.x, mousePos.y)

    manageInput(this)
  }

  draw () {
    drawDialogue(this, this.dialogRect)
  }
}

function drawDialogue (manager, dialogBkgdRect) {
  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(UISprites),
    UISpriteData.TextBackground.x,
    UISpriteData.TextBackground.y,
    UISpriteData.TextBackground.width,
    UISpriteData.TextBackground.height,
    dialogBkgdRect.left,
    dialogBkgdRect.top,
    dialogBkgdRect.width,
    dialogBkgdRect.height
  )

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
    manager.scene.hideGiftDialogue()
  }

  const justDownKeys = manager.scene.inputManager.getJustDownKeys()
  // if (justDownKeys.includes(Keys.N)) {

  // }
}