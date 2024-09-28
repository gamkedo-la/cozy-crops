import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
// import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import UIAttributes from '../globals/UIAttributes.js'
import Keys, { U } from '../globals/Keys.js'
import { UISprites } from '../globals/Images.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class UIScene extends Scene {
  constructor (config) {
    super(config)
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
    this.game.ctx.fillText('UI Test', this.game.canvas.width / 2, this.game.canvas.height - Constants.TitleFontSize / 16)

    // const date = this.game.calendarManager.getDate()
    // this.game.ctx.fillStyle = UIAttributes.UIFontColor
    // this.game.ctx.font = `${UIAttributes.UIFontSize} ${UIAttributes.UIFontFamily}`
    // this.game.ctx.textAlign = UIAttributes.CenterAlign
    // this.game.ctx.fillText(`Year: ${date.year}, Season: ${date.seasonDisplay}, Week: ${date.week}, Day: ${date.day}`, this.game.canvas.width / 2, UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize) / 2)
    drawScoreboard(this)
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }
}

function checkMouseClick (scene, x, y) {
  if (x > scene.game.canvas.width / 4 && x < 3 * scene.game.canvas.width / 4 && y > 3 * scene.game.canvas.height / 4  && y < scene.game.canvas.height) {
    console.log('Clicked on the UI')
  }
}

function drawScoreboard (scene) {
  const scoreboardLeft = scene.game.canvas.width - (2 *  UISpriteData.Scoreboard.width) - 10 // (scene.game.canvas.width / 2) - (UISpriteData.Scoreboard.width / 2)
  const scoreboardTop = 10
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), UISpriteData.Scoreboard.x, UISpriteData.Scoreboard.y, UISpriteData.Scoreboard.width, UISpriteData.Scoreboard.height, scoreboardLeft, scoreboardTop, 2 * UISpriteData.Scoreboard.width, 2 * UISpriteData.Scoreboard.height)
  const date = scene.game.calendarManager.getDate()

  const calendarY = scoreboardTop + 42
  const yearString = date.year.toString().padStart(2, '0')
  const yearLeft = scoreboardLeft + 10
  const yearDataFirstDigit = UISpriteData[`Number${yearString[0]}`]
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), yearDataFirstDigit.x, yearDataFirstDigit.y, yearDataFirstDigit.width, yearDataFirstDigit.height, yearLeft, calendarY, 2 * yearDataFirstDigit.width, 2 * yearDataFirstDigit.height)
  const yearDataSecondDigit = UISpriteData[`Number${yearString[1]}`]
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), yearDataSecondDigit.x, yearDataSecondDigit.y, yearDataSecondDigit.width, yearDataSecondDigit.height, yearLeft + yearDataFirstDigit.width + 2, calendarY, 2 * yearDataSecondDigit.width, 2 * yearDataSecondDigit.height)

  const weekLeft = scoreboardLeft + 46
  const weekString = date.week.toString().padStart(4, '0')
  for (let i = 0; i < 4; i++) {
    const weekData = UISpriteData[`Number${weekString[i]}`]
    scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), weekData.x, weekData.y, weekData.width, weekData.height, weekLeft + (i * (weekData.width + 5)), calendarY, 2 * weekData.width, 2 * weekData.height)
  }

  const dayLeft = scoreboardLeft + 106
  const dayString = date.totalDays.toString().padStart(4, '0')
  for (let i = 0; i < 4; i++) {
    const dayData = UISpriteData[`Number${dayString[i]}`]
    scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), dayData.x, dayData.y, dayData.width, dayData.height, dayLeft + (i * (dayData.width + 5)), calendarY, 2 * dayData.width, 2 * dayData.height)
  }

  const seasonData = UISpriteData[`Season${date.seasonDisplay}`]
  scene.game.ctx.drawImage(scene.imageManager.getImageWithSrc(UISprites), seasonData.x, seasonData.y, seasonData.width, seasonData.height, scoreboardLeft + 98, scoreboardTop + 70, 2 * seasonData.width, 2 * seasonData.height)
}