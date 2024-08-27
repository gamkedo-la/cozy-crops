import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
// import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import UIAttributes from '../globals/UIAttributes.js'
import Keys from '../globals/Keys.js'

export default class UIScene extends Scene {
  constructor (config) {
    super(config)
    this.name = Scenes.UIScene
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class
  }

  draw () {
    // Do NOT call super.draw() here, that would clear the canvas - wiping out the game scene
    this.game.ctx.fillStyle = Constants.TitleTextColor
    this.game.ctx.font = `${Constants.TitleFontSize / 4}px ${Constants.TitleFontFamily}`
    this.game.ctx.textAlign = UIAttributes.CenterAlign
    this.game.ctx.fillText('UI Test', this.game.canvas.width / 2, this.game.canvas.height - Constants.TitleFontSize / 16)

    const date = this.game.calendarManager.getDate()
    this.game.ctx.fillStyle = UIAttributes.UIFontColor
    this.game.ctx.font = `${UIAttributes.UIFontSize} ${UIAttributes.UIFontFamily}`
    this.game.ctx.textAlign = UIAttributes.CenterAlign
    this.game.ctx.fillText(`Year: ${date.year}, Season: ${date.seasonDisplay}, Week: ${date.week}, Day: ${date.day}`, this.game.canvas.width / 2, UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize) / 2)
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }
}