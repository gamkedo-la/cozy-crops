import Scene from './Scene.js'
import Constants from '../globals/Constants.js'
import Colors from '../globals/Colors.js'
import Calendar from '../globals/Calendar.js'
import UIAttributes from '../globals/UIAttributes.js'
import { UISprites } from '../globals/Images.js'
import { Player1 } from '../globals/EntityTypes.js'
import UISpriteData from '../globals/UISpriteData.js'
import { FamilyNames } from '../globals/Fonts.js'
import GiftManager from '../managers/GiftManager.js'
import GiftButton from '../uiElements/GiftButton.js'
import BuyManager from '../managers/BuyManager.js'
import BuyButton from '../uiElements/BuyButton.js'
import SellManager from '../managers/SellManager.js'
import SellButton from '../uiElements/SellButton.js'

export default class UIScene extends Scene {
  constructor (config) {
    super(config)
    this.gameScene = null

    this.shouldShowDialogue = false
    this.dialogue = null
    this.dialogingNPC = null

    this.showGiveButton = false
    this.showBuyButton = false
    this.showSellButton = false

    this.giftDialogShowing = false
    this.buyDialogShowing = false
    this.sellDialogShowing = false

    this.signDialogShowing = false

    this.scoreboardRect = {
      left: this.game.canvas.width - (2 *  UISpriteData.Scoreboard.width) - 10,
      top: 10,
      width: 2 * UISpriteData.Scoreboard.width,
      height: 2 * UISpriteData.Scoreboard.height
    }

    this.dialogRect = {
      top: this.scoreboardRect.top,
      left: (this.game.canvas.width / 2) - (2 * UISpriteData.TextBackground.width),
      width: 4 * UISpriteData.TextBackground.width,
      height: 4 * UISpriteData.TextBackground.height
    }

    this.giftButton = new GiftButton({
      scene: this,
      x: this.dialogRect.left + this.dialogRect.width - 2 * UISpriteData.GiftButton.width - 20,
      y: this.dialogRect.top + this.dialogRect.height - 60,
      container: this.dialogRect
    })

    this.giftManager = null

    this.buyButton = new BuyButton({
      scene: this,
      x: this.dialogRect.left + 20,
      y: this.dialogRect.top + this.dialogRect.height - 60,
      container: this.dialogRect
    })

    this.buyManager = null

    this.sellButton = new SellButton({
      scene: this,
      x: this.dialogRect.left + this.dialogRect.width - 2 * UISpriteData.GiftButton.width - 20,
      y: this.dialogRect.top + this.dialogRect.height - 60,
      container: this.dialogRect
    })

    this.sellManager = null
  }

  init (data) {
    super.init(data) // Call the init method of the parent class

    this.gameScene = data.gameScene

    const managerConfig = {
      scene: this,
      game: this.game,
      imageManager: this.imageManager,
      entityManager: this.entityManager,
      inventoryManager: this.inventoryManager,
      dialogRect: this.dialogRect
    }
    this.giftManager = new GiftManager(managerConfig)
    this.giftManager.init()
    this.buyManager = new BuyManager(managerConfig)
    this.buyManager.init()
    this.sellManager = new SellManager(managerConfig)
    this.sellManager.init()
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    const mousePos = this.game.inputManager.getMousePosition()
    if (this.giftDialogShowing) {
      this.giftManager.update(deltaTime, mousePos)
    } else if (this.buyDialogShowing) {
      this.buyManager.update(deltaTime, mousePos)
    } else if (this.sellDialogShowing) {
      this.sellManager.update(deltaTime, mousePos)
    } else {
      if (mousePos.justDown) checkMouseClick(this, mousePos.x, mousePos.y)
    }
  }

  draw () {
    // Do NOT call super.draw() here, that would clear the canvas - wiping out the game scene
    this.game.ctx.fillStyle = Constants.TitleTextColor
    this.game.ctx.font = `${Constants.TitleFontSize / 4}px ${Constants.TitleFontFamily}`
    this.game.ctx.textAlign = UIAttributes.CenterAlign

    drawScoreboard(this)
    drawStamina(this, this.scoreboardRect)
    drawMoney(this, this.scoreboardRect)
    this.inventoryManager.draw()
    drawDayNightUI(this, this.scoreboardRect)
    drawTimeOfDayUI(this, this.scoreboardRect)

    if (this.shouldShowDialogue) {
      if (this.giftDialogShowing) {
        this.giftManager.draw()
      } else if (this.buyDialogShowing) {
        this.buyManager.draw()
      } else if (this.sellDialogShowing) {
        this.sellManager.draw()
      } else {
        drawDialogue(this, this.dialogRect)
      }
    }
  }

  setShopType (shopType) {
    this.giftManager.setShopType()
    this.buyManager.setShopType(shopType)
    this.sellManager.setShopType(shopType)
  }

  showDialogue (npcType, dialogue, buttons) {
    if (!this.shouldShowDialogue) {
      this.shouldShowDialogue = true
      this.dialogue = dialogue
      this.dialogingNPC = npcType
      this.showGiveButton = buttons.includes('give')
      this.showBuyButton = buttons.includes('buy')
      this.showSellButton = buttons.includes('sell')
      return true
    }

    return false
  }

  hideDialogue (npcType) {
    if (this.dialogingNPC === npcType) {
      this.shouldShowDialogue = false
      this.dialogue = null
      return true
    }

    return false
  }

  showSignDialogue (dialogue) {
    if (!this.shouldShowDialogue) {
      this.shouldShowDialogue = true
      this.signDialogShowing = true
      this.dialogue = dialogue
      this.dialogingNPC = 'Sign'
      this.showGiveButton = false
      return true
    }

    return false
  }

  hideSignDialogue () {
    if (this.signDialogShowing) {
      this.shouldShowDialogue = false
      this.signDialogShowing = false
      this.dialogue = null
      return true
    }

    return false
  }

  showGiftDialogue () {
    console.log('Show gift dialogue')
    this.giftManager.setShopType()
    this.giftDialogShowing = true
  }

  hideGiftDialogue () {
    console.log('Hide gift dialogue')
    this.giftDialogShowing = false
  }

  showBuyDialogue () {
    console.log('Show buy dialogue')
    this.buyDialogShowing = true
  }

  hideBuyDialogue () {
    console.log('Hide buy dialogue')
    this.buyDialogShowing = false
  }

  showSellDialogue () {
    console.log('Show sell dialogue')
    this.sellDialogShowing = true
  }

  hideSellDialogue () {
    console.log('Hide sell dialogue')
    this.sellDialogShowing = false
  }

  hideShowingDialogue () {
    this.hideDialogue(this.dialogingNPC)
    this.hideGiftDialogue()
    this.hideBuyDialogue()
    this.hideSellDialogue()
    this.hideSignDialogue()
  }

  giveItem (item, quantity) {
    this.gameScene.giveItemToNPC(this.dialogingNPC, item, quantity)
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }
}

function checkMouseClick (scene, x, y) {
  const clickedInventoryItem = scene.inventoryManager.getClickedItem(x, y)
  if (clickedInventoryItem) {
    scene.gameScene.handleInventoryItemClick(clickedInventoryItem)
    scene.inventoryManager.setSelectedItem(clickedInventoryItem)
  } else if (scene.showGiveButton && scene.giftButton.checkClicked(x, y)) {
    scene.giftButton.activate()
  } else if (scene.showBuyButton && scene.buyButton.checkClicked(x, y)) {
    scene.buyButton.activate()
  } else if (scene.showSellButton && scene.sellButton.checkClicked(x, y)) {
    scene.sellButton.activate()
  }
}

function drawScoreboard (scene) {
  const scoreboardLeft = scene.scoreboardRect.left // scene.game.canvas.width - (2 *  UISpriteData.Scoreboard.width) - 10
  const scoreboardTop = scene.scoreboardRect.top // 10
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), UISpriteData.Scoreboard.x, UISpriteData.Scoreboard.y, UISpriteData.Scoreboard.width, UISpriteData.Scoreboard.height, scoreboardLeft, scoreboardTop, 2 * UISpriteData.Scoreboard.width, 2 * UISpriteData.Scoreboard.height)
  const date = scene.game.calendarManager.getDate()

  const calendarY = scoreboardTop + 42
  const yearString = date.year.toString().padStart(2, '0')
  const yearLeft = scoreboardLeft + 10
  const yearDataFirstDigit = UISpriteData[`Number${yearString[0]}`]
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), yearDataFirstDigit.x, yearDataFirstDigit.y, yearDataFirstDigit.width, yearDataFirstDigit.height, yearLeft, calendarY, 2 * yearDataFirstDigit.width, 2 * yearDataFirstDigit.height)
  const yearDataSecondDigit = UISpriteData[`Number${yearString[1]}`]
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), yearDataSecondDigit.x, yearDataSecondDigit.y, yearDataSecondDigit.width, yearDataSecondDigit.height, yearLeft + yearDataFirstDigit.width + 5, calendarY, 2 * yearDataSecondDigit.width, 2 * yearDataSecondDigit.height)

  const weekLeft = scoreboardLeft + 46
  const weekString = date.week.toString().padStart(4, '0')
  for (let i = 0; i < 4; i++) {
    const weekData = UISpriteData[`Number${weekString[i]}`]
    scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), weekData.x, weekData.y, weekData.width, weekData.height, weekLeft + (i * (weekData.width + 5)), calendarY, 2 * weekData.width, 2 * weekData.height)
  }

  const dayLeft = scoreboardLeft + 106
  const dayString = date.dayOfSeason.toString().padStart(4, '0')
  for (let i = 0; i < dayString.length; i++) {
    const dayData = UISpriteData[`Number${dayString[i]}`]
    scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), dayData.x, dayData.y, dayData.width, dayData.height, dayLeft + (i * (dayData.width + 5)), calendarY, 2 * dayData.width, 2 * dayData.height)
  }

  const seasonData = UISpriteData[`Season${date.seasonDisplay}`]
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), seasonData.x, seasonData.y, seasonData.width, seasonData.height, scoreboardLeft + 98, scoreboardTop + 70, 2 * seasonData.width, 2 * seasonData.height)
}

function drawMoney(scene, rect) {
  const moneyY = rect.top + 126
  const moneyLeft = rect.left + 28
  const moneyString = scene.gameManager.getMoney().toString().padStart(8, '0')
  for (let i = 0; i < moneyString.length; i++) {
    const moneyData = UISpriteData[`Number${moneyString[i]}`]
    scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), moneyData.x, moneyData.y, moneyData.width, moneyData.height, moneyLeft + (i * (moneyData.width + 9)), moneyY, 2 * moneyData.width, 2 * moneyData.height)
  }
}

function drawStamina (scene, rect) {
  const staminaLeft = scene.game.canvas.width - (2 *  UISpriteData.Stamina.width) -375
  const staminaTop = 800
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), UISpriteData.Stamina.x, UISpriteData.Stamina.y, UISpriteData.Stamina.width, UISpriteData.Stamina.height, staminaLeft, staminaTop, 2 * UISpriteData.Stamina.width, 2 * UISpriteData.Stamina.height)

  const stamina = scene.gameManager.getPlayerStamina(Player1)
  const color = stamina < 20 ? Colors.StaminaExhausted : stamina < 50 ? Colors.StaminaTired : Colors.StaminaRested

  scene.game.ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
  scene.game.ctx.fillRect(staminaLeft + 8, staminaTop + 78 - (stamina * 70 / 100), 8, stamina * 70 / 100)
}

function drawDayNightUI (scene, rect) {
  const staminaLeft = rect.left - (2 * UISpriteData.DayNightUI.width) - 20
  const staminaTop = rect.top + 30
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), UISpriteData.DayNightUI.x, UISpriteData.DayNightUI.y, UISpriteData.DayNightUI.width, UISpriteData.DayNightUI.height, staminaLeft, staminaTop, 2 * UISpriteData.DayNightUI.width, 2 * UISpriteData.DayNightUI.height)
}

function drawTimeOfDayUI (scene, rect) {
  const staminaLeft = rect.left - (2 * UISpriteData.TimeOfDay.width) - 18
  const staminaTop = rect.top + 30 + 2 * (scene.calendarManager.getTimeOfDay() / Calendar.LengthOfDay) * (UISpriteData.DayNightUI.height - 8)
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), UISpriteData.TimeOfDay.x, UISpriteData.TimeOfDay.y, UISpriteData.TimeOfDay.width, UISpriteData.TimeOfDay.height, staminaLeft, staminaTop, 2 * UISpriteData.TimeOfDay.width, 2 * UISpriteData.TimeOfDay.height)
}

function drawDialogue (scene, dialogBkgdRect) {
  if (!scene.dialogue) return

  // set the context's global alpha to 0.85
  scene.game.ctx.globalAlpha = 0.85

  scene.game.ctx.drawImage(
    scene.imageManager.getImageWithSrc(UISprites),
    UISpriteData.TextBackground.x,
    UISpriteData.TextBackground.y,
    UISpriteData.TextBackground.width,
    UISpriteData.TextBackground.height,
    dialogBkgdRect.left,
    dialogBkgdRect.top,
    dialogBkgdRect.width,
    dialogBkgdRect.height
  )

  // reset the context's global alpha to 1
  scene.game.ctx.globalAlpha = 1

  scene.game.ctx.fillStyle = 'black'
  scene.game.ctx.font = `48px ${FamilyNames.FarmVintage}`
  scene.game.ctx.textAlign = UIAttributes.CenterAlign
  const textLines = scene.dialogue.split('\n')

  let lineY = dialogBkgdRect.top + 30
  for (const line of textLines) {
    scene.game.ctx.fillText(line, scene.game.canvas.width / 2, lineY)
    lineY += 30
  }

  if (scene.showGiveButton) {
    scene.giftButton.draw()
  }
  
  if (scene.showBuyButton) {
    scene.buyButton.draw()
  }
  
  if (scene.showSellButton) {
    scene.sellButton.draw()
  }
}
