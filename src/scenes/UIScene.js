import Scene from './Scene.js'
import Constants from '../globals/Constants.js'
import Colors from '../globals/Colors.js'
import UIAttributes from '../globals/UIAttributes.js'
import { UISprites } from '../globals/Images.js'
import { Player1 } from '../globals/EntityTypes.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class UIScene extends Scene {
  constructor (config) {
    super(config)
    this.gameScene = null
  }

  start (gameScene) {
    super.start() // Call the start method of the parent class
    this.gameScene = gameScene
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    const mousePos = this.game.inputManager.getMousePosition()
    if (mousePos.justDown) checkMouseClick(this, mousePos.x, mousePos.y)
  }

  draw () {
    // Do NOT call super.draw() here, that would clear the canvas - wiping out the game scene
    this.game.ctx.fillStyle = Constants.TitleTextColor
    this.game.ctx.font = `${Constants.TitleFontSize / 4}px ${Constants.TitleFontFamily}`
    this.game.ctx.textAlign = UIAttributes.CenterAlign

    const scoreboardRect = drawScoreboard(this)
    drawStamina(this, scoreboardRect)
    drawMoney(this, scoreboardRect)
    this.inventoryManager.draw()
    drawDayNightUI(this, scoreboardRect)
    drawTimeOfDayUI(this, scoreboardRect)
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }
}

function checkMouseClick (scene, x, y) {
  const clickedInventoryItem = scene.inventoryManager.getClikedItem(x, y)
  if (clickedInventoryItem) {
    scene.gameScene.handleInventoryItemClick(clickedInventoryItem)
    scene.inventoryManager.setSelectedItem(clickedInventoryItem)
  }
}

function drawScoreboard (scene) {
  const scoreboardLeft = scene.game.canvas.width - (2 *  UISpriteData.Scoreboard.width) - 10
  const scoreboardTop = 10
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

  return { left: scoreboardLeft, top: scoreboardTop, width: 2 * UISpriteData.Scoreboard.width, height: 2 * UISpriteData.Scoreboard.height }
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
  const staminaTop = rect.top + 30
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), UISpriteData.TimeOfDay.x, UISpriteData.TimeOfDay.y, UISpriteData.TimeOfDay.width, UISpriteData.TimeOfDay.height, staminaLeft, staminaTop, 2 * UISpriteData.TimeOfDay.width, 2 * UISpriteData.TimeOfDay.height)
}
