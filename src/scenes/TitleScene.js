import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import { TitleBackground, TitleBackground2, TitleBackground3, TitleBackground4 } from '../globals/Images.js'
import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import UIAttributes from '../globals/UIAttributes.js'
import Keys from '../globals/Keys.js'
import { BackgroundMusic } from '../globals/Sounds.js'

export default class TitleScene extends Scene {
  constructor (config) {
    super(config)

    this.backgroundImage = null
    this.menu = null
  }

  init (data) {
    super.init(data) // Call the init method of the parent class

    this.backgroundImage = this.imageManager.getImageWithSrc(TitleBackground)
    this.backgroundImage2 = this.imageManager.getImageWithSrc(TitleBackground2)
    this.backgroundImage3 = this.imageManager.getImageWithSrc(TitleBackground3)
    this.backgroundImage4 = this.imageManager.getImageWithSrc(TitleBackground4)

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

    drawBackground(this)
    this.menu.draw()

    this.imageManager.drawOverlay()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  clicked (selection) {
    if (!this.audioManager.isMusicPlaying(BackgroundMusic)) this.audioManager.startMusic(BackgroundMusic)
    if (selection === 'Start') {
      this.game.changeScene(Scenes.PreGame)
    } else if (selection === 'Options') {
      this.game.changeScene(Scenes.Options)
    } else if (selection === 'Credits') {
      this.game.changeScene(Scenes.Credits)
    }
  }
}

// used by the sunshine effect
function drawBitmapCenteredWithRotation(ctx,img,atX,atY,withAng) {
	ctx.save();
	ctx.translate(atX, atY);
	ctx.rotate(withAng);
	ctx.drawImage(img, -img.width/2, -img.height/2);
	ctx.restore();
}

function drawBackground (title) {
  // sky and clouds
  title.game.ctx.drawImage(title.backgroundImage, 0, 0, title.game.canvas.width, title.game.canvas.height)
  // rotating sunshine effect
  drawBitmapCenteredWithRotation(title.game.ctx,title.backgroundImage2,
    title.game.canvas.width/2,title.game.canvas.height/2, 
    performance.now()/8000
  )
  // horizon and rows and crops
  title.game.ctx.drawImage(title.backgroundImage3, 0, 0, title.game.canvas.width, title.game.canvas.height)
  // centered logo
  title.game.ctx.drawImage(title.backgroundImage4,
    title.game.canvas.width/2-title.backgroundImage4.width/2,
    -250+title.game.canvas.height/2-title.backgroundImage4.height/2)
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