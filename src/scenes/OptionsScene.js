import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import UIAttributes from '../globals/UIAttributes.js'
import Keys from '../globals/Keys.js'

export default class OptionsScene extends Scene {
  constructor (config) {
    super(config)

    this.menu = new Menu({
      x: (this.game.canvas.width / (2 * Constants.CanvasScale)) - 15,
      y: this.game.canvas.height - Constants.MainMenuFontSize * 1.5,
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

    // setup resources
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    this.menu.update(deltaTime)
  }

  draw () {
    super.draw() // Call the draw method of the parent class

    drawTitle(this)
    this.menu.draw()
    this.player1Controls.draw()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

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
  title.game.ctx.font = `${Constants.SceneTitleFontSize}px ${Constants.TitleFontFamily}`
  title.game.ctx.textAlign = UIAttributes.CenterAlign
  title.game.ctx.fillText('Options', title.game.canvas.width / 2, Constants.SceneTitleFontSize / 2)
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