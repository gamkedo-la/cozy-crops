import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import UIAttributes from '../globals/UIAttributes.js'
import Keys from '../globals/Keys.js'

export default class TitleScene extends Scene {
  constructor (config) {
    super(config)

    this.menu = null
  }

  start () {
    super.start() // Call the start method of the parent class

    // setup resources
    this.menu = new Menu({
      x: (this.game.canvas.width / (2 * Constants.CanvasScale)) - 65,
      y: 100 + this.game.canvas.height / (2 * Constants.CanvasScale),
      game: this.game,
      scene: this,
      options: ['Start', 'Options', 'Credits'],
      textColor: Constants.MainMenuTextColor,
      fontSize: Constants.MainMenuFontSize,
      fontFamily: Constants.MainMenuFontFamily
    })
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
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  clicked (selection) {
    if (selection === 'Start') {
      this.game.changeScene(Scenes.PreGame)
    } else if (selection === 'Options') {
      this.game.changeScene(Scenes.Options)
    } else if (selection === 'Credits') {
      this.game.changeScene(Scenes.Credits)
    }
  }
}

function drawTitle (title) {
  title.game.ctx.fillStyle = Constants.TitleTextColor
  title.game.ctx.font = `${Constants.TitleFontSize}px ${Constants.TitleFontFamily}`
  title.game.ctx.textAlign = UIAttributes.CenterAlign
  title.game.ctx.fillText('Cozy Crops', title.game.canvas.width / 2, title.game.canvas.height / 4)
}

function manageInput (scene) {
  const justDownKeys = scene.inputManager.getJustDownKeys()

  if (justDownKeys.includes(Keys.ENTER) || justDownKeys.includes(Keys.SPACE)) {
    if (scene.menu.getCurrentSelection() === 'Start') {
      scene.managers.gameManager.loadGame(1)
      scene.game.changeScene(Scenes.Game)
    } else if (scene.menu.getCurrentSelection() === 'Options') {
      scene.game.changeScene(Scenes.Options)
    } else if (scene.menu.getCurrentSelection() === 'Credits') {
      scene.game.changeScene(Scenes.Credits)
    }
  } else if (justDownKeys.includes(Keys.ARROW_UP) || justDownKeys.includes(Keys.W) || justDownKeys.includes(Keys.ARROW_LEFT) || justDownKeys.includes(Keys.A)) {
    scene.menu.moveUp()
  } else if (justDownKeys.includes(Keys.ARROW_DOWN) || justDownKeys.includes(Keys.S) || justDownKeys.includes(Keys.ARROW_RIGHT) || justDownKeys.includes(Keys.D)) {
    scene.menu.moveDown()
  }

  const mousePos = scene.game.inputManager.getMousePosition()
  if (mousePos.justDown) {

  }
}