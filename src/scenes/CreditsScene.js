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
    this.currentY = 0
  }

  init (data) {
    super.init(data) // Call the init method of the parent class

    // initialize resources
    this.menu = new Menu({
      x: (this.game.canvas.width / (2 * Constants.CanvasScale)) - 15,
      y: 100 + this.game.canvas.height / (2 * Constants.CanvasScale),
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
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    this.menu.update(deltaTime)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    drawTitle(this)
    drawCredits(this)
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
  title.game.ctx.font = `${Constants.TitleFontSize}px ${Constants.TitleFontFamily}`
  title.game.ctx.textAlign = UIAttributes.CenterAlign
  title.game.ctx.fillText('Credits', title.game.canvas.width / 2, (title.game.canvas.height / 4 - 100))
}

function drawCredits (scene) {
  scene.game.ctx.fillStyle = Constants.MainMenuTextColor
  scene.game.ctx.font = `${Constants.MainMenuFontSize}px ${Constants.MainMenuFontFamily}`
  scene.game.ctx.textAlign = UIAttributes.LeftAlign

  Credits.forEach((credit, index) => {
    scene.game.ctx.fillText(credit.contributor, 10, 200 + 50 * index)
    credit.contributions.forEach((contribution, contributionIndex) => {
      scene.game.ctx.fillText(contribution, 20, 225 + 50 * index + contributionIndex * 25)
    })
  })
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