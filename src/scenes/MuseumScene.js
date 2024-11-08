import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'
import { MuseumImageData } from '../globals/MuseumImageData.js'
import { Museum } from '../globals/Images.js'
import Curator from '../entities/npcs/Curator.js'

export default class MuseumScene extends Scene {
  constructor (config) {
    super(config)

    this.curator = null
  }

  start () {
    super.start() // Call the start method of the parent class

    // initialize resources
    this.curator = new Curator({
      game: this.game,
      imageManager: this.imageManager,
      x: 100,
      y: 100
    })
    this.curator.init()
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class
    const xPos = (this.game.canvas.width - 2 * MuseumImageData.Museum.width) / 2
    this.game.ctx.fillStyle = '#CFCECE'
    this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    this.game.ctx.drawImage(this.imageManager.getImageWithSrc(Museum), MuseumImageData.Museum.x, MuseumImageData.Museum.y, MuseumImageData.Museum.width, MuseumImageData.Museum.height, xPos, 0, 2 * MuseumImageData.Museum.width, 2 * MuseumImageData.Museum.height)

    this.curator.draw(this.game.camera)
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes(Keys.ESCAPE)) {
    // Go back to the game scene
    scene.game.changeScene(Scenes.Game)
  }
}