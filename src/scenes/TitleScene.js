import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'

export default class TitleScene extends Scene {
  constructor (config) {
    super(config)
    this.name = Scenes.Title

    this.menu = new Menu({
      x: (this.game.canvas.width / (2 * Constants.CanvasScale)) - 65,
      y: 100 + this.game.canvas.height / (2 * Constants.CanvasScale),
      game: this.game,
      scene: this,
      options: ['Start', 'Options', 'Exit'],
      textColor: Constants.MainMenuTextColor,
      fontSize: Constants.MainMenuFontSize,
      fontFamily: Constants.MainMenuFontFamily
    })
    this.currentSelection = 'Start'
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    
    draw(this)
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }
}

function draw (scene) {
  drawTitle(scene)
  scene.menu.draw()
  // scene.game.ctx.drawImage(scene.imageManager.images.TileSet, 0, 0, 512, 512, 0, 0, 512, 512)
}

function drawTitle (title) {
  title.game.ctx.fillStyle = Constants.TitleTextColor
  title.game.ctx.font = `${Constants.TitleFontSize}px ${Constants.TitleFontFamily}`
  title.game.ctx.textAlign = 'center'
  title.game.ctx.fillText('Cozy Crops', title.game.canvas.width / 2, title.game.canvas.height / 4)
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes('Enter')) {
    if (scene.currentSelection === 'Start') {
      scene.game.changeScene(Scenes.Game)
    }
  }
}