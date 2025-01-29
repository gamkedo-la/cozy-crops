import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import UIAttributes from '../globals/UIAttributes.js'
import Keys from '../globals/Keys.js'
import Credits from '../globals/Credits.js'

export default class CreditsScene extends Scene {
  constructor (config) {
    super(config)

    this.menu = null
    this.currentY = this.game.canvas.height
    this.contributorColors = [
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFFF00',
      '#FF00FF',
      '#00FFFF'
    ]
  }

  init (data) {
    super.init(data) // Call the init method of the parent class

    // initialize resources
    this.menu = new Menu({
      x: (this.game.canvas.width / (2 * Constants.CanvasScale)) - 15,
      y: this.game.canvas.height - 50,
      game: this.game,
      scene: this,
      options: ['Back'],
      textColor: Constants.MainMenuTextColor,
      fontSize: Constants.MainMenuFontSize,
      fontFamily: Constants.MainMenuFontFamily
    })
  }

  start () {
    super.start() // Call the start method of the parent class
    this.menu.show()
    this.currentY = this.game.canvas.height
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    this.menu.update(deltaTime)
    this.currentY -= 1
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    drawCredits(this)

    drawTitle(this)
    this.menu.draw()
  }

  stop () {
    super.stop() // Call the stop method of the parent class
    this.menu.hide()
    // clean up resources
  }

  clicked (selection) {
    if (selection === 'Back') {
      this.game.changeScene(Scenes.Title)
    }
  }
}

function drawTitle (title) {
  title.game.ctx.fillStyle = Constants.TitleTextColor
  title.game.ctx.font = `${Constants.TitleFontSize - 10}px ${Constants.TitleFontFamily}`
  title.game.ctx.textAlign = UIAttributes.CenterAlign
  title.game.ctx.fillText('Credits', title.game.canvas.width / 2, (title.game.canvas.height / 4 - 100))
}

function drawCredits (scene) {
  scene.game.ctx.font = `${Constants.MainMenuFontSize}px ${Constants.MainMenuFontFamily}`
  scene.game.ctx.textAlign = UIAttributes.LeftAlign

  let lineIndex = 0
  let contributorIndex = 0
  for (const credit of Credits) {
    scene.game.ctx.fillStyle = scene.contributorColors[contributorIndex]
    scene.game.ctx.fillText(credit.contributor, 100, scene.currentY + 50 * lineIndex)
    lineIndex++
    contributorIndex++
    scene.game.ctx.fillStyle = Constants.MainMenuTextColor
    for (const contribution of credit.contributions) {
      scene.game.ctx.fillText(contribution, 200, scene.currentY + 50 * lineIndex)
      lineIndex++
    }
  }
}

function manageInput (scene) {
  const justDownKeys = scene.inputManager.getJustDownKeys()

  if (justDownKeys.includes(Keys.ENTER) || justDownKeys.includes(Keys.SPACE)) {
    if (scene.menu.getCurrentSelection() === 'Back') {
      scene.game.changeScene(Scenes.Title)
    }
  } else if (justDownKeys.includes(Keys.ARROW_UP) || justDownKeys.includes(Keys.W) || justDownKeys.includes(Keys.ARROW_LEFT) || justDownKeys.includes(Keys.A)) {
    scene.menu.moveUp()
  } else if (justDownKeys.includes(Keys.ARROW_DOWN) || justDownKeys.includes(Keys.S) || justDownKeys.includes(Keys.ARROW_RIGHT) || justDownKeys.includes(Keys.D)) {
    scene.menu.moveDown()
  }
}